'use client';

import { updateClient } from '@/queries/clients';

export default function ClientsList({ arh }) {
  const clients = arh;

  //   console.log(clients);

  return (
    <div className="mt-4">
      {clients.map((client) => (
        <div key={client._id}>
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
            <button type="submit">Сохранить</button>
          </form>
        </div>
      ))}
    </div>
  );
}
