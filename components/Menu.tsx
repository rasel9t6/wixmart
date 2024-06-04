"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Image
        src="/menu.png"
        alt="Menu"
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />{" "}
      {open && (
        <div className="absolute left-0 top-20 bg-black text-white w-full h-screen flex flex-col justify-center items-center gap-8 text-lg z-10">
          <Link href="/" className="hover:border-b-2 hover:border-white">
            Home
          </Link>
          <Link href="/" className="hover:border-b-2 hover:border-white">
            Shop
          </Link>
          <Link href="/" className="hover:border-b-2 hover:border-white">
            Deals
          </Link>
          <Link href="/" className="hover:border-b-2 hover:border-white">
            About
          </Link>
          <Link href="/" className="hover:border-b-2 hover:border-white">
            Contact
          </Link>
          <Link href="/" className="hover:border-b-2 hover:border-white">
            Logout
          </Link>
          <Link href="/" className="hover:border-b-2 hover:border-white">
            Cart(1)
          </Link>
        </div>
      )}
    </div>
  );
}
