'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className='mt-12 flex w-full justify-between'>
      <button
        className='bg-lama w-24 cursor-pointer rounded-md p-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-pink-200'
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className='bg-lama w-24 cursor-pointer rounded-md p-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-pink-200'
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
