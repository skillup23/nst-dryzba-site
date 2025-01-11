import { auth } from "@/auth";
import Logout from "@/components/Logout";
import { revalidatePath } from "next/cache";

const HomePage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  } else {
    revalidatePath("/home", "layout");
  }

  return (
    <div className="flex flex-col items-center m-4">
      <h1 className="text-3xl my-2">Добро пожаловать, {session?.user?.name}</h1>

      <Logout />
    </div>
  );
};

export default HomePage;
