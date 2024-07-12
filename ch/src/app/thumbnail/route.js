import { NextResponse } from 'next/server';
import { generateThumbnail } from '../(app)/server/thumbnail';
import path from 'path';

export async function GET(request) {
  const videoPath = path.join(process.cwd(), 'videos', 'video.mp4');
  try {
    const thumbnailPath = await generateThumbnail(videoPath);
    return NextResponse.json({ thumbnail: thumbnailPath });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
