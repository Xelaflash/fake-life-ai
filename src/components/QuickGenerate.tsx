import { Kanit } from 'next/font/google';
import React, { useState } from 'react';
import Image from 'next/image';
import Loading from './loading';

const kanit = Kanit({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
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
    setLoading(true);
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

  const handleDownload = async () => {
    // TODO: Not working for Dalle images due to cors policy
    const base64Image = stabilityImage;
    const byteCharacters = window.atob(base64Image as string);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'fake_my_life_' + Date.now() + '.jpeg';
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(url);
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
        <div className="border-2 border-pinky border-dotted h-[512px] w-[512px] flex items-center">
          {stabilityImage ? (
            <Image
              src={`data:image/jpeg;base64,${stabilityImage}`}
              width={512}
              height={512}
              alt="stability generated image"
              className="rounded-xl shadow shadow-pinky"
              onClick={handleDownload}
            />
          ) : !isLoading ? (
            <div className="w-fit text-left m-auto">
              <p className="text-bold my-4 text-6xl text-center">🤖</p>
              <p
                className={`${kanit.className} text-semibold italic mt-4 text-2xl`}
              >
                Robot is sleeping...
              </p>
              <aside className={`${kanit.className} text-sm italic`}>
                or maybe plotting to kill humanity but we can&apos;t be sure.
              </aside>
            </div>
          ) : (
            <Loading color="pinky" />
          )}
        </div>
        <div className="border-2 border-greeny border-dotted h-[512px] w-[512px] flex items-center">
          {dalleImage ? (
            <Image
              src={dalleImage}
              width={512}
              height={512}
              alt="Dalle generated image"
              className="rounded-xl shadow shadow-greeny"
              onClick={handleDownload}
            />
          ) : !isLoading ? (
            <div className="w-fit text-left m-auto">
              <p className="text-bold my-4 text-6xl text-center">🤖</p>
              <p
                className={`${kanit.className} text-semibold italic mt-4 text-2xl`}
              >
                Robot is sleeping...
              </p>
              <aside className={`${kanit.className} text-sm italic`}>
                or maybe plotting to kill humanity but we can&apos;t be sure.
              </aside>
            </div>
          ) : (
            <Loading color="greeny" />
          )}
        </div>
      </div>
    </section>
  );
}
