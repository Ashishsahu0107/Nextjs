"use client";

import { useEffect, useState } from "react";
import { Counter } from "./counter/Counter";

interface Post {
  id: number;
  title: string;
  body: string;
}

const ClientCompPage = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const URL = "https://jsonplaceholder.typicode.com/posts";
      const res = await fetch(URL);
      const posts = await res.json();
      setData(posts);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold p-4">Client Component Page</h1>
      <Counter/>
      <ul className="grid grid-cols-4 bg-amber-400 gap-5">
        {data.map((item) => (
          <li
            className="bg-white text-gray-800 m-2 p-3 rounded shadow"
            key={item.id}
          > 
            {item.id} - {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientCompPage;
