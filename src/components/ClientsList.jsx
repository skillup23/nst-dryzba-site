'use client';

import { updateClient } from '@/queries/clients';
import { useEffect, useRef, useState } from 'react';

export default function ClientsList({ arh }) {
  const [isClient, setIsClient] = useState(false);
  const [clients, setClients] = useState([]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Загрузка задач
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await arh;
      setClients(data);
    };
    fetchTasks();
  }, [arh]);

  const formRef = useRef(null);

  function setDayPay(day) {
    const currentDate = new Date(day);
    const result = currentDate.toISOString().substring(0, 10);

    return result;
  }

  return (
    <>
      {isClient ? (
        <ul className="w-full mt-4">
          {clients.map((client) => (
            <li key={client._id} className="border-b-2 border-gray-400">
              <form
                ref={formRef}
                action={async (FormData) => {
                  await updateClient(client._id, FormData);
                  formRef.current?.reset();
                }}
                className="my-3 flex gap-2 text-sm"
              >
                <div className="max-w-[280px] flex flex-col gap-1">
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={client.name}
                    className="input-table border-blue-400"
                  />
                  <div className="flex gap-1">
                    <input
                      type="tel"
                      name="tel"
                      required
                      defaultValue={client.tel}
                      className="input-table w-1/2 border-blue-400"
                    />
                    <input
                      type="number"
                      name="total"
                      defaultValue={client.total}
                      className="input-table w-1/2 border-blue-400"
                    />
                  </div>
                </div>

                <div className="max-w-[200px] flex flex-col gap-1">
                  <input
                    type="text"
                    name="plaseLiving"
                    defaultValue={client.plaseLiving}
                    className="input-table border-orange-400"
                  />
                  <div className="flex gap-1">
                    <input
                      type="text"
                      name="street"
                      defaultValue={client.street}
                      className="input-table w-3/4 border-orange-400"
                    />
                    <input
                      type="text"
                      name="house"
                      defaultValue={client.house}
                      className="input-table w-1/4 border-orange-400"
                    />
                  </div>
                </div>

                <div className="max-w-[200px] flex flex-col gap-1">
                  <input
                    type="date"
                    name="datepay"
                    required
                    defaultValue={setDayPay(client.datepay)}
                    className="input-table border-red-400"
                  />
                  <div className="flex gap-1">
                    <input
                      type="date"
                      name="datestop"
                      required
                      defaultValue={setDayPay(client.datestop)}
                      className="input-table w-7/12 border-red-400"
                    />
                    <p className="w-1/12 text-center">+</p>
                    <input
                      type="number"
                      name="lastpay"
                      defaultValue="0"
                      className="input-table w-4/12 border-red-400"
                    />
                  </div>
                </div>

                <div className="max-w-[200px] flex flex-col gap-1">
                  <input
                    type="text"
                    name="carModel"
                    defaultValue={client.carModel}
                    className="input-table w-full border-purple-400"
                  />
                  <div className="flex gap-1">
                    <input
                      type="text"
                      name="carNumber"
                      defaultValue={client.carNumber}
                      className="input-table w-1/2 border-purple-400"
                    />
                    {/* <input
                      type="text"
                      name="carColor"
                      defaultValue={client.carColor}
                      className="w-1/2 px-1 border border-purple-400"
                    /> */}
                    <select
                      name="carColor"
                      defaultValue={client.carColor}
                      className="input-table w-1/2 border-purple-400"
                    >
                      <option value="Белый">Белый</option>
                      <option value="Зеленый">Зеленый</option>
                      <option value="Красный">Красный</option>
                      <option value="Коричневый">Коричневый</option>
                      <option value="Серебристый">Серебристый</option>
                      <option value="Синий">Синий</option>
                      <option value="Серый">Серый</option>
                      <option value="Черный">Черный</option>
                    </select>
                  </div>
                </div>

                <div className="w-[100px] flex flex-col gap-1">
                  <select
                    name="role"
                    defaultValue={client.role}
                    className="input-table"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                  <select
                    name="stats"
                    defaultValue={client.stats}
                    className="input-table"
                  >
                    <option value="Активен">Активен</option>
                    <option value="Заблокирован">Заблокирован</option>
                  </select>
                </div>

                <button
                  className="w-[85px] px-1 bg-green-300 hover:bg-green-200"
                  type="submit"
                >
                  Сохранить
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        'Загрузка данных...'
      )}
    </>
  );
}
