import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from './model/user-model';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    //Авторизация по почте+пароль
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          //Соотносим user с email в БД
          const user = await User.findOne({
            email: credentials?.email,
          });

          //Если пользователь есть в БД
          if (user) {
            //То соотносим пароль
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );

            //Если пароль верный, то возвращаем user, если нет, то ошибку
            if (isMatch) {
              return user;
            } else {
              throw new Error('Неверный пользователь или пароль');
            }
            //Если пользователь не существует, то возвращаем ошибку
          } else {
            throw new Error('Неверный пользователь или пароль');
          }
          //Ошибка если не смогли получить данные
        } catch (error) {
          throw new Error(error);
        }
      },
      profile(profile) {
        return { role: profile.role ?? 'user' };
      },
    }),
    //Google и GitHub авторизация
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: 'consent',
    //       access_type: 'offline',
    //       response_type: 'code',
    //     },
    //   },
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: 'consent',
    //       access_type: 'offline',
    //       response_type: 'code',
    //     },
    //   },
    // }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
