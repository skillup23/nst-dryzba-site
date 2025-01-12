import { createUser } from "@/queries/users";
import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  //Ожидаем данные с RegistrationForm
  const {
    name,
    tel,
    password,
    plaseLiving,
    street,
    house,
    carModel,
    carNumber,
    carColor,
    total,
    lastpay,
    datepay,
    datestop,
    stats,
    role,
  } = await request.json();

  // console.log(
  //   name,
  //   tel,
  //   password,
  //   plaseLiving,
  //   street,
  //   house,
  //   carModel,
  //   carNumber,
  //   carColor,
  //   total,
  //   lastpay,
  //   datepay,
  //   stats,
  //   role
  // );

  //Создать соединение с mongodb
  await dbConnect();

  //Зашифровать пароль
  const hashedPassword = await bcrypt.hash(password, 5);

  //Подготовить данные формы для передачи
  const newUser = {
    name,
    password: hashedPassword,
    tel,
    plaseLiving,
    street,
    house,
    carModel,
    carNumber,
    carColor,
    total,
    lastpay,
    datepay,
    datestop,
    stats,
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

  return new NextResponse("Пользователь создан", {
    status: 201,
  });
};
