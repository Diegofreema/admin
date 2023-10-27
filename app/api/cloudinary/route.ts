import cloudinary from '@/lib/cloudinary';
import formidable from 'formidable';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(request: any) {
  const form = formidable();
  form.parse(request, async (err, fields, files) => {
    if (err) return new NextResponse('Something went wrong', { status: 500 });
    const imageFile = files.image;
    if (imageFile) {
      const { secure_url } = await cloudinary?.uploader?.upload(
        imageFile.filepath,
        {
          folder: 'blog',
        }
      );
      return NextResponse.json({
        image: secure_url,
      });
    }
  });
}

export async function GET(request: Request) {}
