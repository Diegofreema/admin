'use client';

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import '@uploadthing/react/styles.css';
import React, { useCallback } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import {
  UploadButton,
  UploadDropzone,
  useUploadThing,
} from '@/utils/uploadthing';
import { IconCircleLetterX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ClientUploadedFileData } from 'uploadthing/types';
import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
  FileUploadPreview,
  FileAcceptDetails,
} from '@saas-ui/file-upload';
import { Button, HStack, Image, Text } from '@chakra-ui/react';
import { ImageIcon, Loader2, MousePointerSquareDashed } from 'lucide-react';
import { createClient } from '@/utils/client';
import { useToast } from './ui/use-toast';
import { Progress } from './ui/progress';

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
type TRes = {
  name: string;
  size: number;
  key: string;

  url: string;
}[];
export default function UploadComponent({
  endpoint,
  onChange,
  value,
  video = false,
  blog = false,
}: Props) {
  const fileType = value?.split('.').pop();
  const [isMounted, setIsMounted] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const supabase = createClient();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [urls, setUrls] = useState('');
  const { isUploading, startUpload } = useUploadThing(endpoint, {
    onClientUploadComplete: ([data]) => {
      console.log(data.url);
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
    onUploadError(e) {
      console.log(e);
    },
  });

  // if (res?.length > 1) {
  //   let arrayOfUrls: string[] = [];
  //   res.map((element) => {
  //     arrayOfUrls.push(element?.url);
  //   });
  //   const singleString = arrayOfUrls.join(',');
  //   console.log(singleString);
  //   onChange(singleString);
  // } else {
  //   onChange(res?.[0]?.url);
  // }

  // const deleteUrl = (val: string) => {
  //   if (value.split(',').length === 1) return onChange('');
  //   const arrayOfUrls = value.split(',');
  //   const filteredUrl = arrayOfUrls.filter((url) => url !== val);
  //   value = filteredUrl.join(',');
  //   onChange(filteredUrl.join(','));
  // };

  // const renderImage = () => {
  //   if (value.includes(',')) {
  //     const arrayOfUrls = value.split(',');

  //     return arrayOfUrls.map((url, index) => (
  //       <div
  //         key={index}
  //         className={cn(
  //           'relative mb-5',
  //           blog ? 'h-[200px] w-[300px]' : 'h-20 w-20'
  //         )}
  //       >
  //         <Image
  //           fill
  //           src={url}
  //           alt="Upload"
  //           className={cn('object-cover', blog ? 'rounded-md' : 'rounded-full')}
  //         />
  //         <button
  //           onClick={() => deleteUrl(url)}
  //           className="absolute top-0 right-0 shadow-sm bg-red-500 text-white p-1 rounded-full"
  //           type="button"
  //         >
  //           <IconCircleLetterX className="h-4 w-4" />
  //         </button>
  //       </div>
  //     ));
  //   } else {
  //     return (
  //       <div
  //         className={cn(
  //           'relative mb-5',
  //           blog ? 'h-[200px] w-[300px]' : 'h-20 w-20'
  //         )}
  //       >
  //         <Image
  //           fill
  //           src={value}
  //           alt="Upload"
  //           className={cn('object-cover', blog ? 'rounded-md' : 'rounded-full')}
  //         />
  //         <button
  //           onClick={() => onChange('')}
  //           className="absolute top-0 right-0 shadow-sm bg-red-500 text-white p-1 rounded-full"
  //           type="button"
  //         >
  //           <IconCircleLetterX className="h-4 w-4" />
  //         </button>
  //       </div>
  //     );
  //   }
  // };

  // const renderVideo = () => {
  //   if (video && value.includes(',')) {
  //     const arrayOfUrls = value.split(',');

  //     return arrayOfUrls.map((url, index) => (
  //       <div key={index} className="w-[200px] h-[200px] rounded-md  relative">
  //         <video src={url} className="w-full h-full" controls></video>
  //         <button
  //           onClick={() => onChange('')}
  //           className="absolute top-10 -right-2 shadow-sm bg-red-500 text-white p-1 rounded-full"
  //           type="button"
  //         >
  //           <IconCircleLetterX className="h-4 w-4" />
  //         </button>
  //       </div>
  //     ));
  //   } else {
  //     return (
  //       <div className="w-[200px] h-[200px] rounded-md  relative">
  //         <video src={value} className="w-full h-full" controls></video>
  //         <button
  //           onClick={() => onChange('')}
  //           className="absolute top-10 -right-2 shadow-sm bg-red-500 text-white p-1 rounded-full"
  //           type="button"
  //         >
  //           <IconCircleLetterX className="h-4 w-4" />
  //         </button>
  //       </div>
  //     );
  //   }
  // // };
  // if (value && fileType !== 'pdf') {
  //   return (
  //     <div className="w-full min-h-[180px] flex items-center justify-center flex-wrap gap-4">
  //       {!video ? renderImage() : renderVideo()}
  //     </div>
  //   );
  // }

  if (!isMounted) return null;
  const onDropAccepted = async (acceptedFiles: File[]) => {
    startUpload(acceptedFiles);
    setIsDragOver(false);
  };
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    toast({
      title: `${file.file.type} type is not supported`,
      description: 'Please choose a PNG, JPG or JPEG MP4 file',
      variant: 'destructive',
    });
  };

  return (
    // <UploadButton
    //   endpoint={endpoint}
    //   onClientUploadComplete={(res) => getImageFormat(res)}
    //   onUploadError={(err) => console.log(err.message)}
    // />

    // <FileUpload
    //   className="w-full min-h-[180px] flex items-center justify-center flex-wrap gap-4 bg-black/50"
    //   onFileAccept={getImageFormat}
    //   maxFileSize={1024 * 1024}
    //   maxFiles={50}
    //   accept={'image/*, video/*'}
    // >
    //   {({ files, deleteFile }) => (
    //     <FileUploadDropzone>
    //       <Text fontSize="sm">Drag your image here</Text>
    //       {!files?.length ? (
    //         <FileUploadTrigger as={Button}>Select files</FileUploadTrigger>
    //       ) : (
    //         <HStack>
    //           {/* <Image alt="image" width={200} height={200} src={files[0].} /> */}
    //           <Text>{files.length}</Text>
    //           {files[0].name}
    //           <Button
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               deleteFile(files[0]);
    //             }}
    //           >
    //             Clear
    //           </Button>
    //         </HStack>
    //       )}
    //     </FileUploadDropzone>
    //   )}
    // </FileUpload>

    <>
      {urls && <Image alt="img" src={urls} />}
      <Dropzone
        onDropRejected={onDropRejected}
        multiple={true}
        onDropAccepted={onDropAccepted}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
        accept={{
          'image/png': ['.png'],
          'image/jpeg': ['.jpeg'],
          'image/jpg': ['.jpg'],
          'video/mp4': ['.mp4'],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="w-full min-h-[180px] flex items-center justify-center flex-wrap gap-4 bg-black/30 cursor-pointer">
            <div
              className={cn('flex flex-col items-center justify-center')}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
              ) : isUploading ? (
                <Loader2 className="animate-spin text-zinc-500 mb-2" />
              ) : (
                <ImageIcon className="h-6 w-6 text-zinc-500 mb-2" />
              )}

              <div className="flex flex-col items-center justify-center mb-2 text-small text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p className="text-black">Uploading</p>
                    <Progress value={uploadProgress} />
                  </div>
                ) : isDragOver ? (
                  <p className="text-black">
                    <span className="font-semibold">Drop files here </span>
                    to upload
                  </p>
                ) : (
                  <p className="text-black">
                    <span className="font-semibold">Click to upload </span>
                    or drag and drop
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  );
}
