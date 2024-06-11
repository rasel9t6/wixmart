
import { wixClientServer } from "@/lib/wixClientServer";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const id = params.id;

  const wixClient = await wixClientServer();

  let order;
  try {
    order = await wixClient.orders.getOrder(id);
  } catch (err) {
    return notFound();
  }
  return (
    <div className='flex h-[calc(100vh-180px)] flex-col items-center justify-center'>
      <div className='px-40 py-20 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]'>
        <h1 className='text-xl'>Order Details</h1>
        <div className='mt-12 flex flex-col gap-6'>
          <div className=''>
            <span className='font-medium'>Order Id: </span>
            <span>{order._id}</span>
          </div>
          <div className=''>
            <span className='font-medium'>Receiver Name: </span>
            <span>
              {order.billingInfo?.contactDetails?.firstName + ' '}
              {order.billingInfo?.contactDetails?.lastName}
            </span>
          </div>
          <div className=''>
            <span className='font-medium'>Receiver Email: </span>
            <span>{order.buyerInfo?.email}</span>
          </div>
          <div className=''>
            <span className='font-medium'>Price: </span>
            <span>{order.priceSummary?.subtotal?.amount}</span>
          </div>
          <div className=''>
            <span className='font-medium'>Payment Status: </span>
            <span>{order.paymentStatus}</span>
          </div>
          <div className=''>
            <span className='font-medium'>Order Status: </span>
            <span>{order.status}</span>
          </div>
          <div className=''>
            <span className='font-medium'>Delivery Address: </span>
            <span>
              {order.billingInfo?.address?.addressLine1 + ' '}
              {order.billingInfo?.address?.city}
            </span>
          </div>
        </div>
      </div>
      <Link
        href='/'
        className='mt-6 underline'
      >
        Have a problem? Contact us
      </Link>
    </div>
  );
}