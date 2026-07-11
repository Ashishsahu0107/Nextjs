interface Post {
  id: number;
  title: string;
  body: string;
}

const ServerCompPage = async () => {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(URL);
  const data: Post[] = await res.json();
  return (
    <div>
      <h1 className="text-xl font-bold p-4 text-white">Server Component Page</h1>
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-5 p-4">
        {data.map((item) => (
          <li
            className="bg-white text-gray-800 m-2 p-3 rounded shadow"
            key={item.id}
          >
            <span className="font-bold">{item.id}</span> - {item.title}
            <div className="text-xs mt-2 text-gray-550">{item.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerCompPage;

