import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <div className="">
        <Image
          alt="Wave mart icon"
          src="/wavemart-icon.png"
          className=""
          width={80}
          height={80}
        />
        {/* <Image
              alt='Wave mart log'
              src='/wavemart-text.png'
              width={100}
              height={100}
            /> */}
      </div>
    </Link>
  );
}
