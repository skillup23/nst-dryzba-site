import { NextResponse } from 'next/server';
import { authConfig } from './auth.config';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

//получение публичных и дополнительно защищенных маршрутов
import { PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES } from '@/lib/routes';

export async function middleware(request) {
  //при каждом поступающем запросе проверяем пройдена ли auth
  const { nextUrl } = request;
  //получем сессию пользователя
  const session = await auth();

  //если есть данные пользователя то isAuthenticated = true
  const isAuthenticated = !!session?.user;

  //проверяем маршрут, не зависимо от того общедоступный он или защищенный
  const isPublicRoute =
    (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === ROOT) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

  //если пользователь не в системе и маршрут не публичный, то вернуть на страницу Входа в систему /login
  if (!isAuthenticated && !isPublicRoute)
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
}

// При каких условиях выполнять функцию middleware, к примеру можно указать
// matcher: '/products/:path*',
// и будет выполнена функция middleware если мы посетим страницу /products и ее подстраницы
// так же можно защитить маршруты '/api/:path*'
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
