import { User } from "@/model/user-model";

export async function createUser(user) {
  try {
    await User.create(user);
  } catch (e) {
    throw new Error(e);
  }
}

//получить данные пользователя без пароля
export async function getUserByTel(tel) {
  const user = await User.findOne({ tel: tel }).select("-password").lean();
  return user;
}

//получить данные пользователей без пароля
export async function getAllUsers() {
  const clients = await User.find().select("-password").lean();
  return clients;
}
