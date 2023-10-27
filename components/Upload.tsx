'use client';

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import '@uploadthing/react/styles.css';
import Image from 'next/image';

import { UploadDropzone } from '@/utils/uploadthing';
import { IconCircleLetterX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
interface Props {
  endpoint:
    | 'teamImage'
    | 'projectImage'
    | 'eventImage'
    | 'galleryImg'
    | 'galleryVideo'
    | 'sliderImg'
    | 'projectVideo'
    | 'blogImage';
  onChange: (url: string | undefined) => void;
  value: string;
  video?: boolean;
  blog?: boolean;
}
export default function UploadComponent({
  endpoint,
  onChange,
  value,
  video = false,
  blog = false,
}: Props) {
  const fileType = value?.split('.').pop();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (value && fileType !== 'pdf') {
    return (
      <div className="w-full min-h-[180px] flex items-center justify-center">
        {!video ? (
          <div
            className={cn(
              'relative mb-5',
              blog ? 'h-[200px] w-[300px]' : 'h-20 w-20'
            )}
          >
            <Image
              fill
              src={value}
              alt="Upload"
              className={cn(
                'object-cover',
                blog ? 'rounded-md' : 'rounded-full'
              )}
            />
            <button
              onClick={() => onChange('')}
              className="absolute top-0 right-0 shadow-sm bg-red-500 text-white p-1 rounded-full"
              type="button"
            >
              <IconCircleLetterX className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="w-[200px] h-[200px] rounded-md  relative">
            <video src={value} className="w-full h-full" controls></video>
            <button
              onClick={() => onChange('')}
              className="absolute top-10 -right-2 shadow-sm bg-red-500 text-white p-1 rounded-full"
              type="button"
            >
              <IconCircleLetterX className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!isMounted) return null;
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0]?.url)}
      onUploadError={(err) => console.log(err)}
    />
  );
}
