import { auth } from '@/auth';
import ClientsList from '@/components/ClientsList';
import { getAllUsers } from '@/queries/users';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) redirect('/login');
  if (session?.user.role !== 'admin') redirect('/home');

  const data = await getAllUsers();
  const clients = JSON.parse(JSON.stringify(data));

  if (session?.user.role === 'admin') {
    return (
      <>
        <p>
          Вы авторизованы как администратор, добро пожаловать!{' '}
          {session?.user.name}
        </p>

        <ClientsList arh={clients} />
      </>
    );
  }

  return <p>У вас нет права просматривать данную страницу</p>;
};

export default DashboardPage;
