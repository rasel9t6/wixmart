'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Image
        src='/menu.png'
        alt='Menu'
        width={28}
        height={28}
        className='cursor-pointer'
        onClick={() => setOpen((prev) => !prev)}
      />{' '}
      {open && (
        <div className='absolute left-0 top-20 z-10 flex h-screen w-full flex-col items-center justify-center gap-8 bg-black text-lg text-white'>
          <Link
            href='/'
            className='hover:border-b-2 hover:border-white'
          >
            Home
          </Link>
          <Link
            href='/'
            className='hover:border-b-2 hover:border-white'
          >
            Shop
          </Link>
          <Link
            href='/'
            className='hover:border-b-2 hover:border-white'
          >
            Deals
          </Link>
          <Link
            href='/'
            className='hover:border-b-2 hover:border-white'
          >
            About
          </Link>
          <Link
            href='/'
            className='hover:border-b-2 hover:border-white'
          >
            Contact
          </Link>
          <Link
            href='/'
            className='hover:border-b-2 hover:border-white'
          >
            Logout
          </Link>
          <Link
            href='/'
            className='hover:border-b-2 hover:border-white'
          >
            Cart(1)
          </Link>
        </div>
      )}
    </div>
  );
}
