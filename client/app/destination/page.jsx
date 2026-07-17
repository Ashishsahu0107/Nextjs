"use client";
import { useRouter } from "next/navigation";

const Destination = () => {
  const destination = [
    "Paris",
    "Tokyo",
    "NewYork",
    "London",
    "Dubai",
    "Singapore",
  ];

  const router = useRouter();
  return (
    <>
          <div className="flex flex-col gap-2 justify-center items-center w-screen h-[100vh] bg-black text-white">
            <h1 className="text-2xl mb-4">Choose Your Destination</h1>
              { 
                  destination.map((item, index) => (
                      <p key={index} onClick={() => router.push(`/destination/${item}`)} className="p-3 bg-white rounded-sm w-30 text-black text-center">{item}</p>
                  ))
              }
      </div>
    </>
  );
};

export default Destination;
