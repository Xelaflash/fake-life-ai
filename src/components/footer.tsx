import React from 'react';
import { Twitter, GitHub, Linkedin, Facebook } from 'react-feather';
import Image from 'next/image';
import Link from 'next/link';
import VisuallyHidden from '@/components/VisuallyHidden';
import logo from '../../public/images/logo.png';
import bmcButton from '../../public/images/bmc-button.png';
import { Kanit } from 'next/font/google';

const kanit = Kanit({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
});

export default function Footer() {
  return (
    <footer
      className=" h-[100px] bg-neutral-950/75  w-full bottom-0 flex justify-between items-center p-5 shadow-[0_2px_8px_4px_rgba(0,0,0,1)]"
      style={{
        background:
          'rgba(0, 0, 0, 0.25) linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, rgba(0,0, 0, 0.1) 100%) repeat scroll 0% 0%',
      }}
    >
      <div className="flex items-center gap-4">
        <Image
          src={logo}
          alt="AlexG WebDev"
          width={70}
          height={70}
          quality={100}
        />

        <div className="text-sm font-medium mt-2">
          ©{new Date().getFullYear()} AlexGWebDev. All Rights Reserved.
        </div>
      </div>

      <div className={`flex text-xl ${kanit.className} gap-6`}>
        <Link
          className={`hover:underline hover:decoration-pinky hover:underline-offset-8 hover:decoration-4`}
          href="/stability"
        >
          Stability
        </Link>
        <Link
          className={`hover:underline hover:decoration-greeny hover:underline-offset-8 hover:decoration-4`}
          href="/dalle2"
        >
          Dalle 2
        </Link>
      </div>

      <div className="flex  items-center gap-4">
        <div>
          <a
            href="https://www.buymeacoffee.com/givemethe.money"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={bmcButton}
              alt="Buy me a coffee button"
              quality={75}
              width={200}
              height={56}
            />
          </a>
        </div>
        <div className="flex align-center gap-4 h-fit">
          <a
            href="https://twitter.com/GhostXela"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={24} className="hover:stroke-pinky" />
            <VisuallyHidden>Twitter</VisuallyHidden>
          </a>

          <a
            href="https://github.com/Xelaflash"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub size={24} className="hover:stroke-pinky" />
            <VisuallyHidden>Github</VisuallyHidden>
          </a>

          <a
            href="https://www.facebook.com/alexgwebdev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={24} className="hover:stroke-pinky" />
            <VisuallyHidden>Facebook</VisuallyHidden>
          </a>

          <a
            href="https://www.linkedin.com/in/alexgwebdev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} className="hover:stroke-pinky" />
            <VisuallyHidden>Linkedin</VisuallyHidden>
          </a>
        </div>
      </div>
    </footer>
  );
}
