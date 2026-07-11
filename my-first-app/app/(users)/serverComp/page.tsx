const ServerCompPage = async () => {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(URL);
  const data = await res.json();
  return (
    <div>
      <h1>Server Component Page</h1>
      <ul className="grid grid-cols-4 bg-amber-400 gap-5">
        {data.map((item, index) => (
          <li
            className="bg-white text-gray-800 m-2 p-3 rounded shadow"
            key={item}
          >
            {item.id} - {item.title}
            <div>{item.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerCompPage;
