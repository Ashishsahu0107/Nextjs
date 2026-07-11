"use client";

import Link from 'next/link';

const page = () => {
  return (
    <div>
      <h1>Admin About</h1>
      <p>Welcome to the admin about page!</p>
      <button
      onClick={() => alert('Button clicked!')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click Me
      </button>
    </div>
  );
};

export default page;
