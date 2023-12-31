'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useDeleteProject } from '@/hook/useDeleteProject';
import { useProjectEdit } from '@/hook/useEditProject';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  item: {
    imgUrl: string;
    name: string;
    _id: string;
  };
};

const ProjectComponent = ({ item }: Props) => {
  const { getEditData, setEdit } = useProjectEdit();
  const { onOpen, getId, getVariant } = useDeleteProject();

  const deleteImage = async (id: string) => {
    onOpen();
    getId(id);
  };
  const handleEdit = ({
    id,
    name,
    imgUrl,
  }: {
    id: string;
    name: string;
    imgUrl: string;
  }) => {
    getEditData({ id, name, imgUrl });
    setEdit();
  };
  return (
    <Card className="!h-fit mb-4">
      <CardContent className="flex justify-between flex-col sm:!flex-row space-y-2 items-center pt-4">
        <div className="rounded-full relative w-20 h-20 overflow-hidden">
          <Image
            fill
            priority
            alt="image"
            src={item?.imgUrl}
            className=" object-cover"
          />
        </div>
        <div>
          <p className="uppercase text-bold">{item?.name}</p>
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
          onClick={() => deleteImage(item?._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectComponent;
