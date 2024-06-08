"use client";

import Image from "next/image";

export default function CartModal() {
  const cartItems = true;
  return (
    <div
      className="w-max absolute p-4 rounded-md shadow flex flex-col bg-white top-12
    right-0"
    >
      {!cartItems ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          {" "}
          <h1 className="text-xl text-center font-bold mb-2">Shopping Cart</h1>
          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"
                alt="Cart Image"
                width={72}
                height={96}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                {/* TOP */}
                <div className="">
                  {/* TITLE */}
                  <div className="flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$49</div>
                  </div>
                  {/* DESC */}
                  <div className="text-sm text-gray-500">available</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qun. 2</span>
                  <span className="text-redis">Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div>
            <div className="flex items-center mt-2 justify-between font-semibold">
              <span>Subtotal</span>
              <span>$49</span>
            </div>
            <p className="text-sm mt-2 mb-4 text-gray-500">
              Shipping and taxes calculated at checkout
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
