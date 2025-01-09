import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUserByEmail } from '@/queries/users';
import { dbConnect } from '@/lib/mongo';

export const GET = async (request) => {
  const session = await auth();

  //если информации о пользователе нет, то выдать сообщение
  if (!session?.user) {
    return new NextResponse(`Вы не вошли в систему!`, {
      status: 401,
    });
  }

  //если пользователь вошел в систему то подключиться к БД
  await dbConnect();

  //и попробовать получить данные пользователя используя его email
  try {
    const user = await getUserByEmail(session?.user?.email);
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
