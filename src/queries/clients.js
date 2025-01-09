'use server';
import { dbConnect } from '@/lib/mongo';
import { User } from '@/model/user-model';
import { revalidatePath } from 'next/cache';

export const updateClient = async (id, FormData) => {
  const update = FormData.get('name');

  try {
    await User.updateOne(
      { _id: id },
      {
        name: update,
      }
    );
    revalidatePath('/dashboard', 'page');
    return 'Задача обновлена';
  } catch (error) {
    return { message: 'ошибка обновления данных' };
  }
};
