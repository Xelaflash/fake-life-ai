import { log } from 'console';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}

function Stability() {
  const engineId = 'stable-diffusion-v1-5';
  const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
  const apiKey = process.env.NEXT_PUBLIC_DREAM_STUDIO_KEY;

  const [data, setData] = useState<GenerationResponse | null>(null);
  const [isLoading, setLoading] = useState(false);

  // TODO: run fetch on form submit
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${apiKey}`,
  //     },
  //     body: JSON.stringify({
  //       text_prompts: [
  //         {
  //           // TODO: replace this with your own prompt
  //           text: 'A lighthouse on a cliff',
  //         },
  //       ],
  //       cfg_scale: 7,
  //       clip_guidance_preset: 'FAST_BLUE',
  //       height: 512,
  //       width: 512,
  //       samples: 1,
  //       steps: 30,
  //     }),
  //   }).then((response) => {
  //     response.json().then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  //   });
  // }, [apiHost, apiKey, engineId]);

  return (
    <div className="min-h-screen">
      <h2 className="my-8 text-9xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-br from-pinky to-violine leading-tight">
        Stability
      </h2>
      <div className="flex flex-col items-center justify-center">
        {isLoading && <p className="text-bold my-4 text-4xl">Loading...</p>}
      </div>
      {data && (
        <div className="flex flex-col items-center justify-center">
          <Image
            src={`data:image/jpeg;base64,${data.artifacts[0].base64}`}
            width={512}
            height={512}
            alt="stability generated image"
          />
        </div>
      )}
    </div>
  );
}

export default Stability;
