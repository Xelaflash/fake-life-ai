import { Kanit } from 'next/font/google';

const kanit = Kanit({
  weight: '800',
  subsets: ['latin'],
  style: 'italic',
  display: 'swap',
});

export default function Home() {
  const links = [
    { name: 'Stability', href: '/stability' },
    { name: 'Midjourney', href: '/midjourney' },
    { name: 'DALL·E 2', href: 'dalle2' },
  ];
  const stats = [
    { name: 'Fake life created', value: '12K+' },
    { name: 'Followers Generated', value: '300+' },
    { name: 'Happy clients', value: '40M+' },
  ];

  return (
    <div className="min-h-[90vh] mx-auto max-w-7xl px-6 py-56 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 ">
        <h2
          className={`${kanit.className} text-9xl italic tracking-tight text-white `}
          style={{ textShadow: '4px 4px 6px #b60b74;' }}
        >
          Fake Life AI
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          {/* TODO: Ask chatGpt to create a phrase for that */}
          Fake your life on social media by creating images with AI.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
          {links.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name} <span aria-hidden="true">&rarr;</span>
            </a>
          ))}
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="flex flex-col-reverse">
              <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
              <dd className="text-3xl font-bold leading-9 tracking-tight text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
