"use client";

import { Counter } from "./counter/Counter";

const ClientCompPage = async () => {

    const URL = "https://jsonplaceholder.typicode.com/posts";
    const res = await fetch(URL);
    const data = await res.json();

  return (
    <div>
      <h1>Client Component Page</h1>
         <Counter/>
          <ul className="grid grid-cols-4 bg-amber-400 gap-5">
              {data.map((item, idx) => (
                  <li
                    className="bg-white text-gray-800 m-2 p-3 rounded shadow"
                    key={idx.id}
                  > 
                      {item.id} - {item.title
                      }
                  </li>
              ))}
          </ul>
    </div>
  );
};

export default ClientCompPage;
