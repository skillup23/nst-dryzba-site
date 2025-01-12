import { auth } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Landing() {
  const session = await auth();
  if (session?.user) {
    redirect("/home");
  }
  return (
    <>
      <h1 className="text-center">НСТ Дружба</h1>
      <h2 className="text-center">Управление шлагбаумом</h2>
      <div className="flex flex-col justify-center items-center p-8 gap-2">
        <Link href="/login" className="w-40 p-2 bg-slate-500 text-center">
          Войти
        </Link>
        <Link href="/register" className="w-40 p-2 bg-slate-500 text-center">
          Регистрация
        </Link>
      </div>
    </>
  );
}
