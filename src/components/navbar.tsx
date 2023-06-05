import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Assets
import logo from '../../public/images/logo.png';
import { Kanit } from 'next/font/google';
import { useRouter } from 'next/router';

const kanit = Kanit({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
});

export default function Navbar() {
  const [active, setActive] = useState(false);

  // set link active when clicked
  const handleClick = () => {
    setActive(!active);
  };

  const router = useRouter();

  return (
    <nav className="border border-red-500 h-[80px] flex items-center justify-between px-2">
      <Link href="/">
        <Image src={logo} width={80} height={80} alt="Logo of AlexG WebDev" />
      </Link>
      <div className="filler grow"></div>
      <div
        className={`text-2xl ${kanit.className} flex pr-10 gap-[64px] grow -ml-[64px] `}
      >
        <Link
          className={`hover:underline hover:decoration-pinky hover:underline-offset-8 hover:decoration-4 ${
            router.pathname == '/stability'
              ? 'underline decoration-pinky underline-offset-8 decoration-4'
              : ''
          }`}
          href="/stability"
          onClick={handleClick}
        >
          Stability
        </Link>
        <Link
          className={`hover:underline hover:decoration-greeny hover:underline-offset-8 hover:decoration-4 ${
            router.pathname == '/dalle2'
              ? 'underline decoration-greeny underline-offset-8 decoration-4'
              : ''
          }`}
          href="/dalle2"
          onClick={handleClick}
        >
          Dalle 2
        </Link>
      </div>
    </nav>
  );
}
