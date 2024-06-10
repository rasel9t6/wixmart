import Link from 'next/link';
import Menu from './Menu';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavIcons from './NavIcons';

export default function Navbar() {
  return (
    <nav className='relative h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
      {/* Mobile */}
      <div className='flex h-full items-center justify-between md:hidden'>
        <Logo />
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className='hidden h-full items-center justify-between gap-8 md:flex'>
        {/* LEFT */}
        <div className='flex w-1/3 items-center gap-12 xl:w-1/2'>
          <Logo />
          <div className='hidden gap-4 xl:flex'>
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
        <div className='flex w-2/3 items-center justify-between gap-8 xl:w-1/2'>
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </nav>
  );
}
