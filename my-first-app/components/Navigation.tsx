import Link from "next/link";
import { DialogDemo } from "./DialogDemo";
import { Button } from "./ui/button";
import {DrawerDemo} from "./DrawerDemo";

const Navigation = () => {
  return (
    <nav className="flex gap-3 px-7 sticky top-0 h-[60px] justify-between items-center bg-amber-500">
      <h1 className="text-3xl">Logo</h1>
      <ul className="flex gap-4 text-2xl items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <Button
          variant="primary"
        >
          <DialogDemo /> 
        </Button>
        <Button
          variant="primary"
        >
          <DrawerDemo/>
        </Button>
      </ul>
    </nav>
  );
};

export default Navigation;
