import { NextResponse } from 'next/server';
import { createUser } from '@/queries/users';

import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/mongo';

export const POST = async (request) => {
  //Ожидаем данные с RegistrationForm
  const { name, email, password, role } = await request.json();

  // console.log(name, email, password, role);

  //Создать соединение с mongodb
  await dbConnect();

  //Зашифровать пароль
  const hashedPassword = await bcrypt.hash(password, 5);

  //Подготовить данные формы для передачи
  const newUser = {
    name,
    password: hashedPassword,
    email,
    role,
  };

  //Обновить данные в mongodb
  try {
    await createUser(newUser);
  } catch (err) {
    return new NextResponse(error.mesage, {
      status: 500,
    });
  }

  return new NextResponse('Пользователь создан', {
    status: 201,
  });
};
