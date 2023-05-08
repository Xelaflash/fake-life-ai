import Image from 'next/image';
import { useState } from 'react';

// TODO: check implementation with discord server bot + webhook or discord api

function Midjourney() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [promptValue, setPromptValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(promptValue);
  };

  return (
    <div className="min-h-screen">
      <h2 className="my-6 text-8xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-br from-bluey to-blueyDark leading-tight pb-16">
        Midjourney
      </h2>
      <div className="content flex items-center justify-around">
        <form onSubmit={handleSubmit} className="">
          <label htmlFor="prompt" className="font-bold text-md">
            AI prompt
          </label>
          <textarea
            name="prompt"
            id="prompt"
            className="mt-1 w-96 h-32 block px-3 py-2 bg-black border border-blueyDark rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-bluey focus:ring-1 focus:ring-bluey"
            placeholder="Enter desired image description"
            onChange={(e) => setPromptValue(e.target.value)}
            value={promptValue}
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-bluey to-blueyDark my-4 px-6 py-3.5 rounded-3xl hover:opacity-75 text-center text-white font-bold text-md w-full disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={promptValue === ''}
          >
            Generate Image
          </button>
          <div className="my-10 flex flex-col items-center justify-center h-[60px]">
            {isLoading && (
              <p className="text-bold my-4 text-lg">
                {' '}
                🤖 Generating Image...beep boop
              </p>
            )}
          </div>
        </form>
        <div className="flex flex-col items-center justify-center">
          <div className="border-2 border-bluey border-dotted h-[512px] w-[512px] ">
            {data && (
              <Image
                src={`s`}
                width={512}
                height={512}
                alt="stability generated image"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Midjourney;
