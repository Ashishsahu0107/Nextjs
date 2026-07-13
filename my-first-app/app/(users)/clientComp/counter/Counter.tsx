import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8 bg-primary inline-block">
      <p className="text-white">{count} likes</p>
      <button className="btn btn-primary " onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
