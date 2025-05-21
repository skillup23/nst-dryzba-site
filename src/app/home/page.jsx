import { auth } from '@/auth';
import Logout from '@/components/Logout';
import TelegramSender from '@/components/TelegramSender';
import { getUserByTel } from '@/queries/users';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const HomePage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect('/');
  } else {
    revalidatePath('/', 'layout');
  }

  const data = await getUserByTel(session?.user?.tel);
  const client = await JSON.parse(JSON.stringify(data));

  // function diffDays(time) {
  //   const date1 = new Date();
  //   const date2 = new Date(time);

  //   const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));

  //   if (diffDays <= 0) {
  //     return 0;
  //   } else {
  //     return diffDays;
  //   }
  // }

  let dateEnd = 0;
  // const oneDayPay = 2.5;
  const date1 = new Date();
  const date2 = new Date(client.datestop);
  const diffDays = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    dateEnd = 0;
  } else {
    dateEnd = diffDays;
  }

  const deadline = date2.toLocaleDateString('ru-RU');

  // const balance = client.lastpay - dateEnd * 2.5;

  return (
    <div className="mx-2 flex flex-col items-center">
      <h1 className="text-xl my-2 text-center">
        Добро пожаловать,
        <br /> {session?.user?.name}
      </h1>

      {session?.user.role === 'admin' ? (
        <Link href="/dashboard" className="p-2 bg-slate-500">
          Панель управления
        </Link>
      ) : (
        ''
      )}

      <ul className="w-full my-2 flex flex-col gap-2 text-base">
        <li className="w-full flex justify-between text-sm">
          <h6>ID учетной записи</h6>
          <p>{client._id}</p>
        </li>
        <li className="w-full flex justify-between ">
          <h6>Телефон</h6>
          <p>{client.tel}</p>
        </li>
        <li className="w-full flex justify-between ">
          <h6>Место жительства:</h6>
          <p>{client.plaseLiving}</p>
        </li>
        <li className="w-full flex justify-between ">
          <h6>Адрес:</h6>
          <p>
            ул.{client.street}, д. {client.house}
          </p>
        </li>
        <li className="w-full flex justify-between ">
          <h6>Оплачено до:</h6>
          <p>{deadline}</p>
        </li>
        <li className="w-full flex justify-between ">
          <h6>Оплачено дней:</h6>
          <p>{dateEnd}</p>
        </li>
        <li className="w-full flex justify-between ">
          <h6>Баланс</h6>
          <p>{client.total} ₽</p>
        </li>
        <li className="w-full flex justify-between ">
          <h6>Автомобиль</h6>
          <p>
            {client.carModel} <br />
            {client.carNumber} <br />
            {client.carColor}
          </p>
        </li>
        <li className="w-full flex justify-between text-base">
          <h6>Последний платеж:</h6>
          <p>{client.lastpay} ₽</p>
        </li>
      </ul>

      <TelegramSender />

      <Logout />
    </div>
  );
};

export default HomePage;
