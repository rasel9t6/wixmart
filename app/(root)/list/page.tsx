import { wixClientServer } from '@/app/api/route';
import Filter from '@/components/Filter';
import ProductList from '@/components/ProductList';
import Skeleton from '@/components/Skeleton';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function ListPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const wixClient = await wixClientServer();
  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || 'all-products'
  );
  return (
    <main className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative'>
      {/* CAMPAIGN */}
      <div className='hidden bg-pink-50 px-4 sm:flex justify-between h-64'>
        <div className='w-2/3 flex flex-col items-center justify-center gap-8'>
          <h1 className='text-4xl font-semibold leading-[48px] text-gray-700'>
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className='rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm'>
            Buy Now
          </button>
        </div>
        <div className='relative w-1/3'>
          <Image
            src='/woman.png'
            alt=''
            fill
            sizes='100vw'
            className='object-contain'
          />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className='mt-12 text-xl font-semibold'>
        {/* {cat?.collection?.name} For You! */}
        For you
      </h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList
          categoryId={
            cat.collection?._id || '00000000-000000-000000-000000000001'
          }
          searchParams={searchParams}
        />
      </Suspense>
    </main>
  );
}
