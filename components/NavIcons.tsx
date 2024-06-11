'use client';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CartModal from './CartModal';
import { useWixClient } from '@/hooks/useWixClient';
import { useCartStore } from '@/hooks/useCartStore';

export default function NavIcons() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push('/login');
    }
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove('refreshToken');
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const { counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);
  return (
    <div className='relative flex items-center gap-4 xl:gap-6'>
      <Image
        src='/profile.png'
        alt=''
        width={22}
        height={22}
        className='cursor-pointer'
        // onClick={login}
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className='absolute left-0 top-12 z-20 rounded-md bg-white p-4 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
          <Link href='/profile'>Profile</Link>
          <div
            className='mt-2 cursor-pointer'
            onClick={handleLogout}
          >
            {isLoading ? 'Logging out' : 'Logout'}
          </div>
        </div>
      )}
      <Image
        src='/notification.png'
        alt=''
        width={22}
        height={22}
        className='cursor-pointer'
      />
      <div
        className='relative cursor-pointer'
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image
          src='/cart.png'
          alt=''
          width={22}
          height={22}
        />
        <div className='absolute -right-4 -top-4 flex h-6 w-6 items-center justify-center rounded-full bg-redis text-sm text-white'>
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
}
