import Image from 'next/image';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { fetchProject, fetchProjectVideos } from '@/lib/actions/user';
import { Card, CardContent } from '@/components/ui/card';
import AddProject from '@/components/AddProject';
import AddProjectVideo from './_components/AddProjectVideo';
export default async function Project() {
  const projects = await fetchProject();
  const videos = await fetchProjectVideos();

  const displayProjectImg =
    projects?.length > 0 ? (
      projects?.map((item, i) => (
        <Card key={i} className="!h-fit mb-4">
          <CardContent className="flex justify-between flex-col sm:!flex-row space-y-2 items-center pt-4">
            <div className="rounded-full relative w-20 h-20 overflow-hidden">
              <Image
                fill
                priority
                alt="image"
                src={item.imgUrl}
                className=" object-cover"
              />
            </div>
            <div>
              <p className="uppercase text-bold">{item.name}</p>
            </div>
          </CardContent>
        </Card>
      ))
    ) : (
      <h2 className="text-center font-bold text-xl">No Project Image Yet</h2>
    );
  const displayProjectVideos =
    videos?.length > 0 ? (
      videos?.map((item, i) => (
        <Card key={i} className="!h-fit mb-4">
          <CardContent className="flex justify-between flex-col sm:!flex-row space-y-2 items-center pt-4">
            <div className="  overflow-hidden">
              <video src={item.videoUrl}></video>
            </div>
            <div>
              <p className="uppercase text-bold">{item.name}</p>
            </div>
          </CardContent>
        </Card>
      ))
    ) : (
      <h2 className="text-center font-bold text-xl">No Project Video Yet</h2>
    );
  return (
    <div className="py-[100px]  w-[90%] mx-auto space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-20 gap-y-8">
        <div className="space-y-16">
          <h2 className="text-center font-bold text-xl">Add A Project Image</h2>
          <AddProject />
        </div>
        <div className="space-y-16">
          <h2 className="text-center font-bold text-xl">Images</h2>
          <ScrollArea className="max-h-[500px]">{displayProjectImg}</ScrollArea>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-20 gap-y-8">
        <div className="space-y-16">
          <h2 className="text-center font-bold text-xl">Add A Project Video</h2>
          <AddProjectVideo />
        </div>
        <div className="space-y-16">
          <h2 className="text-center font-bold text-xl">Videos</h2>
          <ScrollArea className="max-h-[500px]">
            {displayProjectVideos}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
