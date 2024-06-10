'use client';

import Image from 'next/image';

export default function CartModal() {
  const cartItems = true;
  return (
    <div className='absolute right-0 top-12 flex w-max flex-col rounded-md bg-white p-4 shadow'>
      {!cartItems ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          {' '}
          <h1 className='mb-2 text-center text-xl font-bold'>Shopping Cart</h1>
          <div className='flex flex-col gap-8'>
            <div className='flex gap-4'>
              <Image
                src='https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
                alt='Cart Image'
                width={72}
                height={96}
                className='rounded-md object-cover'
              />
              <div className='flex w-full flex-col justify-between'>
                {/* TOP */}
                <div className=''>
                  {/* TITLE */}
                  <div className='flex items-center justify-between gap-8'>
                    <h3 className='font-semibold'>Product Name</h3>
                    <div className='rounded-sm bg-gray-50 p-1'>$49</div>
                  </div>
                  {/* DESC */}
                  <div className='text-sm text-gray-500'>available</div>
                </div>
                {/* BOTTOM */}
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-500'>Qun. 2</span>
                  <span className='text-redis'>Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div>
            <div className='mt-2 flex items-center justify-between font-semibold'>
              <span>Subtotal</span>
              <span>$49</span>
            </div>
            <p className='mb-4 mt-2 text-sm text-gray-500'>
              Shipping and taxes calculated at checkout
            </p>
            <div className='flex justify-between text-sm'>
              <button className='rounded-md px-4 py-3 ring-1 ring-gray-300'>
                View Cart
              </button>
              <button className='rounded-md bg-black px-4 py-3 text-white'>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
