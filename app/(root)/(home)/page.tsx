import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import Skeleton from '@/components/Skeleton';
import Slider from '@/components/Slider';

import { Suspense } from 'react';

export default async function HomePage() {
  // const wixClient = useWixClient();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const res = await wixClient.products.queryProducts().find();
  //       console.log(res); // Do something with the response
  //     } catch (error) {
  //       console.error('Failed to fetch products:', error);
  //     }
  //   };

  //   getProducts();
  // }, [wixClient]);

  // const wixClient = await wixClientServer();
  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);

  return (
    <>
      <Slider />
      <div className='mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
        <h1 className='text-2xl'>Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className='mt-24'>
        <h1 className='text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12'>
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className='mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64'>
        <h1 className='text-2xl'>New Products</h1>
        {/* <ProductList /> */}
      </div>
    </>
  );
}
