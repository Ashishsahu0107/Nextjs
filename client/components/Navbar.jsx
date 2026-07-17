"use client";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation"

const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex w-screen sticky top-0 bg-green-400 justify-between px-4 items-center h-15">
        <div className="flex items-center">
          <Image src={"vercel.svg"} width={20} height={20} alt="this is log" />
          <h1>Travel Guide</h1>
        </div>
        <div className="flex gap-4">
          <Link href={"/"} className={router.pathname === "/" ? "text-primary" : "text-black"}>Home</Link>
          <Link href={"/destination"} className={router.pathname === "/destination" ? "text-blue" : "text-black"}>Destination</Link>
          <Link href={"/contact"} className={router.pathname === "/contact" ? "text-blue" : "text-black"}>Contact</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
