import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";

import { CircleUserRound } from "lucide-react";

const Navbar = async () => {
  const session = await auth();
  const loggedInUser = session?.user;
  // console.log(loggedInUser);
  const userName = loggedInUser?.name;

  return (
    <header className="flex justify-between items-center bg-slate-900 text-white p-3">
      <Link href="/">
        <h1 className="text-xl">НСТ Дружба</h1>
      </Link>
      <nav>
        <div className="flex">
          {userName ? (
            <div className="flex items-center">
              {session?.user.role === "admin" ? (
                <Link href="/dashboard">
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      alt={session?.user?.name}
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                  ) : (
                    <CircleUserRound />
                  )}
                </Link>
              ) : (
                <Link href="/home">
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      alt={session?.user?.name}
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                  ) : (
                    <CircleUserRound />
                  )}
                </Link>
              )}

              <span className="mx-1">|</span>
              <Logout />
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/login">Войти</Link>

              <Link href="/register">Регистрация</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
