'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useDeleteProject } from '@/hook/useDeleteProject';
import { useEditVideo } from '@/hook/useEditVideo';

type Props = {
  item: {
    videoUrl: string;
    name: string;
    _id: string;
  };
};

const VideoComponent = ({ item }: Props) => {
  const { getEditData, setEdit } = useEditVideo();
  const { onOpen, getId, getVariant } = useDeleteProject();
  const deleteVideo = async (id: string) => {
    onOpen();
    getId(id);
    getVariant('video');
  };
  const handleEdit = ({
    id,
    name,
    videoUrl,
  }: {
    id: string;
    name: string;
    videoUrl: string;
  }) => {
    getEditData({ id, name, videoUrl });
    setEdit();
  };
  return (
    <Card className="!h-fit mb-4">
      <CardContent className="space-y-3   pt-4">
        <div className="  overflow-hidden">
          <video controls src={item?.videoUrl}></video>
        </div>
        <div>
          <span className="first-letter:!uppercase">Project name: </span>
          <span className="uppercase text-bold">{item?.name}</span>
        </div>
      </CardContent>
      <CardFooter className="space-x-4">
        <Button
          variant={'purple'}
          className="w-full"
          onClick={() => handleEdit({ ...item, id: item?._id })}
        >
          Edit
        </Button>
        <Button
          variant={'destructive'}
          className="w-full"
          onClick={() => deleteVideo(item?._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoComponent;
