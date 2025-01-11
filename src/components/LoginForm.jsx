"use client";

import { doCredentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = () => {
  //Начало ошибки гидратации https://nextjs.org/docs/messages/react-hydration-error
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  //Конец ошибки гидратации

  const [error, setError] = useState("");
  const router = useRouter();

  async function handleFormSubmit(event) {
    event.preventDefault();

    try {
      //получаем значения полей ввода
      const formData = new FormData(event.currentTarget);
      //отправляем в сервеный компонент
      const response = await doCredentialLogin(formData);

      //если ошибка, то возращаем ошибку
      if (!!response.error) {
        setError(response.error.message);
        //если нет ошибок, то перенаправляем на домашнюю страницу
      } else {
        router.push("/home");
        // router.reload("/home")
      }
    } catch (e) {
      console.error(e);
      setError("Проверьте правильность телефона или пароля");
    }
  }

  return (
    <>
      {isClient ? (
        <div>
          <p className="text-xl text-red-500">{error}</p>
          <form
            className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
            onSubmit={handleFormSubmit}
          >
            <div className="my-2">
              <label htmlFor="tel">Телефон</label>
              <input
                className="border mx-2 border-gray-500 rounded"
                type="tel"
                name="tel"
                id="tel"
              />
            </div>

            <div className="my-2">
              <label htmlFor="password">Password</label>
              <input
                className="border mx-2 border-gray-500 rounded"
                type="password"
                name="password"
                id="password"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
            >
              Ceredential Login
            </button>
          </form>
        </div>
      ) : (
        "Загрузка компонента"
      )}
    </>
  );
};

export default LoginForm;
