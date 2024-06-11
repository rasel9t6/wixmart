/* eslint-disable @typescript-eslint/no-explicit-any */
import { products } from '@wix/stores';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { wixClientServer } from '@/app/api/route';
import Pagination from './Pagination';

export default async function ProductList({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) {
  const PRODUCT_PER_PAGE = 8;
  const wixClient = await wixClientServer();
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith('name', searchParams?.name || '')
    .eq('collectionIds', categoryId)
    .hasSome(
      'productType',
      searchParams?.type ? [searchParams.type] : ['physical', 'digital']
    )
    .gt('priceData.price', searchParams?.min || 0)
    .lt('priceData.price', searchParams?.max || 999999)
    .limit(limit || 20)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );
  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(' ');

    if (sortType === 'asc') {
      productQuery.ascending(sortBy);
    }
    if (sortType === 'desc') {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className='mt-12 flex flex-wrap justify-between gap-x-8'>
      {res.items.map((product: products.Product) => (
        <Link
          key={product._id}
          href={'/' + product.slug}
          className='mt-4 flex w-full flex-col gap-4 sm:w-[45%] lg:w-[22%]'
        >
          <div className='relative h-80 w-full'>
            <Image
              src={product.media?.mainMedia?.image?.url || '/product.png'}
              alt='Product Image'
              fill
              sizes='25vw'
              className='absolute z-10 rounded-md object-cover transition-opacity duration-500 ease-out hover:opacity-0'
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1]?.image?.url || '/product.png'}
                alt='Product Image'
                fill
                sizes='25vw'
                className='absolute rounded-md object-cover'
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
          <button className='w-max rounded-2xl px-4 py-2 text-xs text-redis ring ring-redis transition-all duration-300 hover:bg-redis hover:text-white hover:ring-inset'>
            Add to Cart
          </button>
        </Link>
      ))}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null}
    </div>
  );
}
