'use server';
import { dbConnect } from '@/lib/mongo';
import { User } from '@/model/user-model';
import { revalidatePath } from 'next/cache';

export const updateClient = async (id, FormData) => {
  const name = FormData.get('name');
  const email = FormData.get('email');
  const role = FormData.get('role');

  try {
    await User.updateOne(
      { _id: id },
      {
        name: name,
        email: email,
        role: role,
      }
    );
    revalidatePath('/dashboard', 'page');
    return 'Задача обновлена';
  } catch (error) {
    return { message: 'ошибка обновления данных' };
  }
};
