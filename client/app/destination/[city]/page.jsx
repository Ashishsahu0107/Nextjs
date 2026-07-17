"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import paries from "@/assets/paries.png";
import london from "@/assets/london.png";
import dubai from "@/assets/dubai.png";
import newyork from "@/assets/newyork.png";
import singapur from "@/assets/singapur.png";
import tokyo from "@/assets/tokyo.png";

const page = (params) => {
  const { city } = useParams();
  return (
    <>
      <div className="w-[50%] h-screen flex justify-center items-center">
        <h1 className="text-2xl text-white">Welcome to {city}</h1>
        {city === "Paris" && (
          <Image src={paries} alt="paries" width={200} height={200} />
        )}
        {city === "London" && (
          <Image src={london} alt="london" width={200} height={200} />
        )}
        {city === "Dubai" && (
          <Image src={dubai} alt="dubai" width={200} height={200} />
        )}
        {city === "NewYork" && (
          <Image src={newyork} alt="newyork" width={200} height={200} />
        )}
        {city === "Singapore" && (
          <Image src={singapur} alt="singapur" width={200} height={200} />
        )}
        {city === "Tokyo" && (
          <Image src={tokyo} alt="tokyo" width={200} height={200} />
        )}
      </div>
    </>
  );
};

export default page;
