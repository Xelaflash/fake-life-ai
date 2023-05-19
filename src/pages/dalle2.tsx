import Image from 'next/image';
import { useState } from 'react';

// TODO: add image alteration feature

function Dalle2() {
  const [isLoading, setLoading] = useState(false);
  const [promptValue, setPromptValue] = useState('');
  const [data, setData] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/dalle', {
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
      const data = await response.json();
      setData(data.result[0].url);
      console.log(data.result[0].url);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <h2 className="my-6 text-8xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-br from-greeny to-greenydark leading-tight pb-16">
        DALL·E 2
      </h2>
      <div className="content flex items-center justify-around">
        <form onSubmit={handleSubmit} className="">
          <label htmlFor="prompt" className="font-bold text-md">
            AI prompt
          </label>
          <textarea
            name="prompt"
            id="prompt"
            className="mt-1 w-96 h-32 block px-3 py-2 bg-black border border-greenydark rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-greeny focus:ring-1 focus:ring-greeny"
            placeholder="Enter desired image description"
            onChange={(e) => setPromptValue(e.target.value)}
            value={promptValue}
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-greeny to-greenydark my-4 px-6 py-3.5 rounded-3xl hover:opacity-75 text-center text-white font-bold text-md w-full disabled:bg-yellow-500 disabled:opacity-70 disabled:cursor-not-allowed"
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
          <div className="border-2 border-greeny border-dotted h-[512px] w-[512px] ">
            {data && (
              <Image
                src={data}
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

export default Dalle2;
