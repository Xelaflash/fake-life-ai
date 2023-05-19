import Image from 'next/image';
import { useState } from 'react';

interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}

function Stability() {
  // TODO: refacto to use api routes (prevent key leak)
  const engineId = 'stable-diffusion-v1-5';
  const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
  const apiKey = process.env.NEXT_PUBLIC_DREAM_STUDIO_KEY;

  const [data, setData] = useState<GenerationResponse | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [promptValue, setPromptValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(promptValue);
    fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: promptValue,
          },
        ],
        cfg_scale: 7,
        clip_guidance_preset: 'FAST_BLUE',
        height: 512,
        width: 512,
        samples: 1,
        steps: 30,
        style_preset: 'photographic',
      }),
    }).then((response) => {
      response.json().then((data) => {
        setData(data);
        setLoading(false);
        setPromptValue('');
      });
    });
  };

  return (
    <div className="min-h-screen">
      <h2 className="my-6 text-8xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-br from-pinky to-violine leading-tight pb-16">
        Stability
      </h2>
      <div className="content flex items-center justify-around">
        <form onSubmit={handleSubmit} className="">
          <label htmlFor="prompt" className="font-bold text-md">
            AI prompt
          </label>
          <textarea
            name="prompt"
            id="prompt"
            className="mt-1 w-96 h-32 block px-3 py-2 bg-black border border-violine rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-pinky focus:ring-1 focus:ring-pinky"
            placeholder="Enter desired image description"
            onChange={(e) => setPromptValue(e.target.value)}
            value={promptValue}
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-pinky to-violine my-4 px-6 py-3.5 rounded-3xl hover:opacity-75 text-center text-white font-bold text-md w-full disabled:bg-yellow-500 disabled:opacity-70 disabled:cursor-not-allowed"
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
          <div className="border-2 border-pinky border-dotted h-[512px] w-[512px] ">
            {data && (
              <Image
                src={`data:image/jpeg;base64,${data.artifacts[0].base64}`}
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

export default Stability;
