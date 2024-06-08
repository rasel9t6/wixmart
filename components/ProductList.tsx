import { products } from '@wix/stores';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { wixClientServer } from '@/app/api/wixServer/route';
export default async function ProductList({
  categoryId,
  limit,
}: {
  categoryId: string;
  limit?: number;
}) {
  const wixClient = await wixClientServer();
  const res = await wixClient.products
    .queryProducts()
    .eq('collectionIds', categoryId)
    .limit(limit || 20)
    .find();

  return (
    <div className='mt-12 flex gap-x-8 justify-between flex-wrap'>
      {res.items.map((product: products.Product) => (
        <Link
          key={product._id}
          href={'/' + product.slug}
          className='w-full mt-4 flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'
        >
          <div className='relative w-full h-80'>
            <Image
              src={product.media?.mainMedia?.image?.url || '/product.png'}
              alt='Product Image'
              fill
              sizes='25vw'
              className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-out duration-500'
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || '/product.png'}
                alt='Product Image'
                fill
                sizes='25vw'
                className='absolute object-cover rounded-md'
              />
            )}
          </div>
          <div className='flex justify-between'>
            <span>{product.name}</span>
            <span className='font-semibold'>
              {product.price?.formatted?.price}
            </span>
          </div>
          {product.description && (
            <div
              className='text-sm text-gray-500'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description || ''),
              }}
            ></div>
          )}
          <button className='rounded-2xl ring hover:ring-inset ring-redis text-redis py-2 w-max px-4 text-xs hover:bg-redis hover:text-white transition-all duration-300'>
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
}
