"use server";
import { User } from "@/model/user-model";
import { revalidatePath } from "next/cache";

export const updateClient = async (id, FormData) => {
  const name = FormData.get("name");
  const tel = FormData.get("tel");
  // const total = Number(totalClient) + Number(FormData.get("total"));
  const role = FormData.get("role");
  const datepay = FormData.get("datepay");
  const lastpay = FormData.get("lastpay");
  const street = FormData.get("street");
  const house = FormData.get("house");
  const carModel = FormData.get("carModel");
  const carNumber = FormData.get("carNumber");
  const carColor = FormData.get("carColor");
  const stats = FormData.get("stats");

  var currentDate = new Date(FormData.get("datestop"));
  const oneDayCost = 2.5;
  const datestop = currentDate.setDate(
    currentDate.getDate() + Number(FormData.get("lastpay")) / oneDayCost
  );

  const dateNow = new Date();
  const total = Math.ceil(
    ((currentDate - dateNow) / (1000 * 60 * 60 * 24)) * 2.5
  );
  console.log(total);

  try {
    await User.updateOne(
      { _id: id },
      {
        name: name,
        tel: tel,
        // total: total,
        datepay: datepay,
        datestop: datestop,
        lastpay: lastpay,
        total: total,
        street: street,
        house: house,
        carModel: carModel,
        carNumber: carNumber,
        carColor: carColor,
        stats: stats,
        role: role,
      }
    );
    revalidatePath("/dashboard", "page");
    return "Задача обновлена";
  } catch (error) {
    return { message: "ошибка обновления данных" };
  }
};
