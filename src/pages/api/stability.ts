//  fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         text_prompts: [
//           {
//             text: promptValue,
//           },
//         ],
//         cfg_scale: 7,
//         clip_guidance_preset: 'FAST_BLUE',
//         height: 512,
//         width: 512,
//         samples: 1,
//         steps: 30,
//         style_preset: 'photographic',
//       }),

import { NextApiRequest, NextApiResponse } from 'next';

interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const engineId = 'stable-diffusion-v1-5';
  const apiHost = 'https://api.stability.ai';
  const apiKey = process.env.DREAM_STUDIO_KEY;
  const promptValue = req.body.prompt;

  const result = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
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
    }
  );

  const data = (await result.json()) as GenerationResponse;

  res.status(200).json(data);
}
