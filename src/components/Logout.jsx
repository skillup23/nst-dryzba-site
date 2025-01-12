import { doLogout } from "@/app/actions";

const Logout = () => {
  return (
    <form action={doLogout}>
      <button className="bg-red-400 text-white p-1 rounded" type="submit">
        Выход
      </button>
    </form>
  );
};

export default Logout;
