import { Kanit } from 'next/font/google';
import React, { useState } from 'react';
import Image from 'next/image';

const kanit = Kanit({
  weight: '600',
  subsets: ['latin'],

  display: 'swap',
});

export default function QuickGenerate() {
  const [promptValue, setPromptValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [dalleImage, setDalleImage] = useState<string | null>(null);
  const [stabilityImage, setStabilityImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/stability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptValue,
        }),
      });
      const data = await response.json();
      setStabilityImage(data.artifacts[0].base64);

      const responseDalle = await fetch('/api/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptValue,
          n: 1,
          size: '512x512',
        }),
      });
      const dataDalle = await responseDalle.json();
      setDalleImage(dataDalle.result[0].url);
      setLoading(false);
      setPromptValue('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="quickGenSection" className="border border-red-600">
      <h2
        className={`text-5xl font-bold ${kanit.className} tracking-tight text-white my-10 text-center`}
      >
        Generate Images now
      </h2>
      <form onSubmit={handleSubmit} className="">
        <div className="mx-auto w-fit">
          <label htmlFor="prompt" className="font-bold text-md">
            AI prompt
          </label>
          <textarea
            name="prompt"
            id="prompt"
            className="mt-1 w-[550px] h-24 block px-3 py-2 bg-black border border-zinc-600 rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-greenydark focus:ring-1 focus:ring-greenydark"
            placeholder="Enter desired image description"
            onChange={(e) => setPromptValue(e.target.value)}
            value={promptValue}
          />
          <div className="text-center">
            <button
              type="submit"
              className="text-center bg-greenydark my-4 px-6 py-3.5 rounded-3xl hover:opacity-75 text-white font-bold text-md w-[500px] disabled:cursor-not-allowed shadow-md shadow-white"
              disabled={promptValue === ''}
            >
              Generate Image
            </button>
          </div>
        </div>
        <div className="mt-1 mb-2 flex flex-col items-center justify-center h-[40px]">
          {isLoading && (
            <p className="text-bold my-4 text-lg">
              {' '}
              🤖 Generating Image...beep boop
            </p>
          )}
        </div>
      </form>
      {/* image section */}
      <div className="flex items-center justify-center mb-8 gap-4">
        {stabilityImage && (
          <Image
            src={`data:image/jpeg;base64,${stabilityImage}`}
            width={512}
            height={512}
            alt="stability generated image"
            className="rounded-xl shadow shadow-pinky"
          />
        )}
        {dalleImage && (
          <Image
            src={dalleImage}
            width={512}
            height={512}
            alt="Dalle generated image"
            className="rounded-xl shadow shadow-greeny"
          />
        )}
      </div>
    </section>
  );
}
