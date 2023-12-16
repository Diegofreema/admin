import Image from 'next/image';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import {
  deleteProjectImg,
  fetchProject,
  fetchProjectVideos,
} from '@/lib/actions/user';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import AddProject from '@/components/AddProject';
import AddProjectVideo from './_components/AddProjectVideo';
import { Button } from '@/components/ui/button';
import ProjectComponent from './_components/ProjectComponent';
import DeleteProjectModal from '@/components/DeleteProjectModal';
import VideoComponent from './_components/VideoComponent';
export default async function Project() {
  const projects = await fetchProject();
  const videos = await fetchProjectVideos();

  const displayProjectImg =
    projects?.length > 0 ? (
      projects?.map((item, i) => <ProjectComponent key={i} item={item} />)
    ) : (
      <h2 className="text-center font-bold text-xl">No Project Image Yet</h2>
    );
  const displayProjectVideos =
    videos?.length > 0 ? (
      videos?.map((item, i) => <VideoComponent key={i} item={item} />)
    ) : (
      <h2 className="text-center font-bold text-xl">No Project Video Yet</h2>
    );
  return (
    <div className="py-[100px]  w-[90%] mx-auto space-y-10">
      <DeleteProjectModal />
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
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20 gap-y-8">
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
