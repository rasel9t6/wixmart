/* eslint-disable @typescript-eslint/no-explicit-any */
import { wixClientServer } from '@/app/api/route';
import Add from '@/components/Add';
import CustomizeProducts from '@/components/CustomizeProducts';
import ProductImages from '@/components/ProductImages';
import Reviews from '@/components/Reviews';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import DOMPurify from 'isomorphic-dompurify';
export default async function SinglePage({
  params,
}: {
  params: { slug: string };
}) {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq('slug', params.slug)
    .find();
  if (!products.items[0]) {
    return notFound();
  }
  const product = products.items[0];
  return (
    <div className='relative flex flex-col gap-16 px-4 md:px-8 lg:flex-row lg:px-16 xl:px-32 2xl:px-64'>
      {/* IMG */}
      <div className='top-20 h-max w-full lg:sticky lg:w-1/2'>
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className='flex w-full flex-col gap-6 lg:w-1/2'>
        <h1 className='text-4xl font-medium'>{product.name}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description || ''),
          }}
          className='text-gray-500'
        ></div>
        <div className='h-[2px] bg-gray-100' />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className='text-2xl font-medium'>${product.price?.price}</h2>
        ) : (
          <div className='flex items-center gap-4'>
            <h3 className='text-xl text-gray-500 line-through'>
              ${product.price?.price}
            </h3>
            <h2 className='text-2xl font-medium'>
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )}
        <div className='h-[2px] bg-gray-100' />
        {product.variants && product.productOptions ? (
          <CustomizeProducts
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId='00000000-0000-0000-0000-000000000000'
            stockNumber={product.stock?.quantity || 0}
          />
        )}
        <div className='h-[2px] bg-gray-100' />
        {product.additionalInfoSections?.map((section: any) => (
          <div
            className='text-sm'
            key={section.title}
          >
            <h4 className='mb-4 font-medium'>{section.title}</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(section.description || ''),
              }}
            ></div>
          </div>
        ))}
        <div className='h-[2px] bg-gray-100' />
        {/* REVIEWS */}
        <h1 className='text-2xl'>User Reviews</h1>
        {/* <Suspense fallback='Loading...'>
          <Reviews productId={product._id!} />
        </Suspense> */}
      </div>
    </div>
  );
}
