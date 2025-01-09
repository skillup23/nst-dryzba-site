'use server';

import { signIn, signOut } from '@/auth';

//Авторизация для Google и Gihub
// export async function doSocialLogin(formData) {
//   const action = formData.get('action');
//   await signIn(action, { redirectTo: '/home' });
// }

//Общий выход из системы
export async function doLogout() {
  await signOut({ redirectTo: '/' });
}

//Авторизация для логин+пароль
export async function doCredentialLogin(formData) {
  try {
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      //Переадресацию делаем в клиентском компоненте,
      //так как тут не сможем проверить успешная ли авторизация и не сможем выдать ошибки
      redirect: false,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
