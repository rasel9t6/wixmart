import Image from 'next/image';
import Link from 'next/link';
import Menu from './Menu';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavIcons from './NavIcons';

export default function Navbar() {
  return (
    <div className='h-20 relative px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
      {/* Mobile */}
      <div className='flex h-full md:hidden items-center justify-between'>
        <Logo />
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className='hidden md:flex items-center h-full justify-between gap-8'>
        {/* LEFT */}
        <div className='w-1/3 xl:w-1/2 flex items-center gap-12'>
          <Logo />
          <div className='hidden xl:flex gap-4'>
            <Link
              href='/'
              className='hover:border-b-2 hover:border-black'
            >
              Home
            </Link>
            <Link
              href='/'
              className='hover:border-b-2 hover:border-black'
            >
              Shop
            </Link>
            <Link
              href='/'
              className='hover:border-b-2 hover:border-black'
            >
              Deals
            </Link>
            <Link
              href='/'
              className='hover:border-b-2 hover:border-black'
            >
              About
            </Link>
            <Link
              href='/'
              className='hover:border-b-2 hover:border-black'
            >
              Contact
            </Link>
            <Link
              href='/'
              className='hover:border-b-2 hover:border-black'
            >
              Logout
            </Link>
          </div>
        </div>
        {/* Right */}
        <div className='w-2/3 xl:w-1/2 flex gap-8 items-center justify-between'>
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
}
