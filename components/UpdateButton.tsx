'use client';
import { useFormStatus } from 'react-dom';

export default function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className='max-w-96 cursor-pointer rounded-md bg-redis p-2 text-white disabled:cursor-not-allowed disabled:bg-pink-200'
    >
      {pending ? 'Updating...' : 'Update'}
    </button>
  );
}
