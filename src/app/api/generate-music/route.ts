import {NextRequest, NextResponse} from 'next/server';
import {generateMusic} from '@/ai/flows/generate-music-from-prompt';

export async function POST(req: NextRequest) {
  const {prompt} = await req.json();

  if (!prompt) {
    return NextResponse.json({error: 'Prompt is required'}, {status: 400});
  }

  try {
    const result = await generateMusic({prompt, style: 'pop'});
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating music:', error);
    return NextResponse.json(
      {error: 'Failed to generate music'},
      {status: 500}
    );
  }
}
