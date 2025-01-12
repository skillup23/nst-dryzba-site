"use client";

import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      //получаем значения полей ввода
      const formData = new FormData(event.currentTarget);
      const now = new Date();

      const name = formData.get("name");
      const tel = formData.get("tel");
      const password = formData.get("password");
      const plaseLiving = formData.get("plaseLiving");
      const street = formData.get("street");
      const house = formData.get("house");
      const carModel = formData.get("carModel");
      const carNumber = formData.get("carNumber");
      const carColor = formData.get("carColor");
      const total = 0;
      const lastpay = 0;
      const datepay = now;
      const datestop = now;
      const stats = "Заблокирован";
      const role = "user";

      //Отправляем POST запрос с данными в серверный компонент
      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          tel,
          password,
          plaseLiving,
          street,
          house,
          carModel,
          carNumber,
          carColor,
          total,
          lastpay,
          datepay,
          datestop,
          stats,
          role,
        }),
      });

      //если регистрация успешна то перенаправь пользователя на страницу входа
      response.status === 201 && router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="my-2">
          <label htmlFor="name">ФИО</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="name"
            id="name"
            required
          />
        </div>

        <div className="my-2">
          <label htmlFor="tel">Телефон</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="tel"
            name="tel"
            id="tel"
            required
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Пароль</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="password"
            name="password"
            id="password"
            required
          />
        </div>

        <div className="my-2">
          <label htmlFor="plaseLiving">Место жительства</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="plaseLiving"
            id="plaseLiving"
          />
        </div>

        <div className="my-2">
          <label htmlFor="street">Улица</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="street"
            id="street"
          />
        </div>

        <div className="my-2">
          <label htmlFor="house">Номер дома</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="house"
            id="house"
          />
        </div>

        <div className="my-2">
          <label htmlFor="carModel">Марка и модель автомобиля</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="carModel"
            id="carModel"
          />
        </div>

        <div className="my-2">
          <label htmlFor="carNumber">Номер автомобиля</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="carNumber"
            id="carNumber"
          />
        </div>

        <div className="my-2">
          <label htmlFor="carColor">Цвет автомобиля</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="carColor"
            id="carColor"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center"
        >
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
