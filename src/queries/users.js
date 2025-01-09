import { User } from '@/model/user-model';

export async function createUser(user) {
  try {
    await User.create(user);
  } catch (e) {
    throw new Error(e);
  }
}

//получить данные пользователя без пароля
export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).select('-password').lean();
  return user;
}

//получить данные пользователя без пароля
export async function getAllUsers() {
  const clients = await User.find().select('-password').lean();
  return clients;
}
