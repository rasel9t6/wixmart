import Image from 'next/image';
import Link from 'next/link';

export default function ProductList() {
  return (
    <div className="mt-12 flex gap-x-8 justify-between flex-wrap">
      <Link
        href="/"
        className="w-full mt-4 flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/6465840/pexels-photo-6465840.jpeg"
            alt="Product Image"
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-out duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/6465838/pexels-photo-6465838.jpeg"
            alt="Product Image"
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span>Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>
        <button className="rounded-2xl ring hover:ring-inset ring-redis text-redis py-2 w-max px-4 text-xs hover:bg-redis hover:text-white transition-all duration-300">
          Add to Cart
        </button>
      </Link>
      <Link
        href="/"
        className="w-full mt-4 flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
      >
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/6465840/pexels-photo-6465840.jpeg"
            alt="Product Image"
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-out duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/6465838/pexels-photo-6465838.jpeg"
            alt="Product Image"
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span>Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>
        <button className="rounded-2xl ring hover:ring-inset ring-redis text-redis py-2 w-max px-4 text-xs hover:bg-redis hover:text-white transition-all duration-300">
          Add to Cart
        </button>
      </Link>
    </div>
  );
}
