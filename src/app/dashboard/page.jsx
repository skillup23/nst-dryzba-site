import { auth } from "@/auth";
import ClientsList from "@/components/ClientsList";
import { getAllUsers } from "@/queries/users";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session?.user.role !== "admin") redirect("/home");

  const data = await getAllUsers();
  const clients = JSON.parse(JSON.stringify(data));

  if (session?.user.role === "admin") {
    return (
      <>
        <p>
          Вы авторизованы как администратор, добро пожаловать!{" "}
          {session?.user.name}
        </p>

        <div className="my-4 flex gap-2 text-sm">
          <div className="w-[280px] text-center bg-blue-300">
            ФИО/телефон/остаток
          </div>
          <div className="w-[200px] text-center bg-orange-300">Адрес</div>
          <div className="w-[200px] text-center bg-red-300">Оплата</div>
          <div className="w-[200px] text-center bg-purple-300">Автомобиль</div>
          <div className="w-[100px] text-center bg-gray-300">Доступ</div>
          <div className="w-[85px] text-center bg-green-300"></div>
        </div>
        <ClientsList arh={clients} />
      </>
    );
  }

  return <p>У вас нет права просматривать данную страницу</p>;
};

export default DashboardPage;
