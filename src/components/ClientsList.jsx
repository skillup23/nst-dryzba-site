"use client";

import { updateClient } from "@/queries/clients";
import { useEffect, useState } from "react";

export default function ClientsList({ arh }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const clients = arh;

  //   console.log(clients);

  return (
    <>
      {isClient ? (
        <ul className="mt-4">
          {clients.map((client) => (
            <li key={client._id}>
              <form
                action={async (FormData) => {
                  await updateClient(client._id, FormData);
                }}
              >
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={client.name}
                />
                <input
                  type="tel"
                  name="tel"
                  required
                  defaultValue={client.tel}
                />
                <select name="role" defaultValue={client.role}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
                <button type="submit">Сохранить</button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        "Загрузка данных..."
      )}
    </>
  );
}
