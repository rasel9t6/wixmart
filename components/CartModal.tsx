/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCartStore } from '@/hooks/useCartStore';
import { useWixClient } from '@/hooks/useWixClient';
import { currentCart } from '@wix/ecom';
import { media as wixMedia } from '@wix/sdk';

import Image from 'next/image';

export default function CartModal() {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='absolute right-0 top-12 z-20 flex w-max flex-col gap-6 rounded-md bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
      {!cart.lineItems ? (
        <div className=''>Cart is Empty</div>
      ) : (
        <>
          <h2 className='text-xl'>Shopping Cart</h2>
          {/* LIST */}
          <div className='flex flex-col gap-8'>
            {/* ITEM */}
            {cart.lineItems.map((item: any) => (
              <div
                className='flex gap-4'
                key={item._id}
              >
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt=''
                    width={72}
                    height={96}
                    className='rounded-md object-cover'
                  />
                )}
                <div className='flex w-full flex-col justify-between'>
                  {/* TOP */}
                  <div className=''>
                    {/* TITLE */}
                    <div className='flex items-center justify-between gap-8'>
                      <h3 className='font-semibold'>
                        {item.productName?.original}
                      </h3>
                      <div className='flex items-center gap-2 rounded-sm bg-gray-50 p-1'>
                        {item.quantity && item.quantity > 1 && (
                          <div className='text-xs text-green-500'>
                            {item.quantity} x{' '}
                          </div>
                        )}
                        ${item.price?.amount}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className='text-sm text-gray-500'>
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-500'>Qty. {item.quantity}</span>
                    <span
                      className='text-blue-500'
                      style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className=''>
            <div className='flex items-center justify-between font-semibold'>
              <span className=''>Subtotal</span>
              <span className=''>${cart.subtotal.amount}</span>
            </div>
            <p className='mb-4 mt-2 text-sm text-gray-500'>
              Shipping and taxes calculated at checkout.
            </p>
            <div className='flex justify-between text-sm'>
              <button className='rounded-md px-4 py-3 ring-1 ring-gray-300'>
                View Cart
              </button>
              <button
                className='rounded-md bg-black px-4 py-3 text-white disabled:cursor-not-allowed disabled:opacity-75'
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
