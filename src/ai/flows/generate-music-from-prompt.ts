'use server';

/**
 * @fileOverview AI music generation from prompts. Allows users to enter a prompt
 * describing the type of music they want to hear, and generates a track based on that input.
 *
 * - generateMusic - A function that handles the music generation process.
 * - GenerateMusicInput - The input type for the generateMusic function.
 * - GenerateMusicOutput - The return type for the generateMusic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateMusicInputSchema = z.object({
  prompt: z.string().describe('A description of the type of music to generate.'),
});
export type GenerateMusicInput = z.infer<typeof GenerateMusicInputSchema>;

const GenerateMusicOutputSchema = z.object({
  musicDataUri: z.string().describe('The generated music as a data URI.'),
  lyrics: z.string().describe('The generated lyrics for the music.'),
});
export type GenerateMusicOutput = z.infer<typeof GenerateMusicOutputSchema>;

export async function generateMusic(input: GenerateMusicInput): Promise<GenerateMusicOutput> {
  return generateMusicFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const lyricsPrompt = ai.definePrompt({
  name: 'generateLyricsPrompt',
  input: { schema: GenerateMusicInputSchema },
  prompt: `You are a creative songwriter. Based on the following prompt, write a short, single-verse song or poem.
  
  Prompt: {{{prompt}}}
  
  Be creative and interpret the prompt musically. The output should be just the lyrics, no titles or other text.`,
});


const generateMusicFlow = ai.defineFlow(
  {
    name: 'generateMusicFlow',
    inputSchema: GenerateMusicInputSchema,
    outputSchema: GenerateMusicOutputSchema,
  },
  async (input) => {
    const lyricsResponse = await lyricsPrompt(input);
    const lyrics = lyricsResponse.text;

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: lyrics,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      musicDataUri: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
      lyrics: lyrics,
    };
  }
);
