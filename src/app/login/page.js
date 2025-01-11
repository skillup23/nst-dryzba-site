import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) redirect("/home");

  if (!session?.user) {
    return (
      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-3xl my-3">Hey, time to Sign In</h1>
        <LoginForm />
        <p className="my-3">
          Dont you have an account?
          <Link href="register" className="mx-2 underline">
            Register
          </Link>
        </p>
      </div>
    );
  }
};

export default LoginPage;
