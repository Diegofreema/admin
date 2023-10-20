import Image from 'next/image';

import { fetchGallery, fetchVideos } from '@/lib/actions/user';
import AddImage from '@/components/AddImage';
import AddVideo from '@/components/AddVideo';
export default async function Gallery() {
  const gallery = await fetchGallery();
  const videos = await fetchVideos();

  const displayImages =
    gallery?.length > 0 ? (
      gallery?.map((item, i) => (
        <Image
          key={i}
          width={200}
          height={100}
          priority
          alt="image"
          src={item?.imgUrl}
          className=" object-cover rounded-md"
        />
      ))
    ) : (
      <h2 className="text-center font-bold text-xl">No images to display</h2>
    );
  const displayVideos =
    videos?.length > 0 ? (
      videos?.map((item, i) => (
        <video controls key={i} src={item.videoUrl}></video>
      ))
    ) : (
      <h2 className="text-center font-bold text-xl">No Videos to display</h2>
    );
  return (
    <div className="py-[100px] w-[90%] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-20 gap-y-8">
        <div>
          <div className="space-y-16 mb-5">
            <h2 className="text-center font-bold text-xl">Add An Image</h2>
            <AddImage />
          </div>
          <div className="space-y-16">
            <h2 className="text-center font-bold text-xl">Add A Video</h2>
            <AddVideo />
          </div>
        </div>

        <div className="space-y-16">
          <h2 className="text-center font-bold text-xl">Gallery</h2>
          <div className="grid max-h-[500px]  place-items-center overflow-y-auto grid-cols-1 sm:grid-cols-2 gap-4">
            {displayImages}
          </div>
          <div className="grid max-h-[500px] place-items-center overflow-y-auto grid-cols-1 sm:grid-cols-2 gap-4">
            {displayVideos}
          </div>
        </div>
      </div>
    </div>
  );
}
