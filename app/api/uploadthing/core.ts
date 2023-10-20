import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  teamImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  projectImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  projectVideo: f({
    video: { maxFileSize: '1024MB', maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  eventImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  galleryImg: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  galleryVideo: f({
    video: { maxFileSize: '1024MB', maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  sliderImg: f({
    image: { maxFileSize: '128MB', maxFileCount: 1 },
  }).onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
