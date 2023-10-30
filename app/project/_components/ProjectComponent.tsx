'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { deleteProjectImg } from '@/lib/actions/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {
  item: {
    imgUrl: string;
    name: string;
    _id: string;
  };
};

const ProjectComponent = ({ item }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const deleteImage = async (id: string) => {
    setLoading(true);
    try {
      await deleteProjectImg(id);
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Project has been deleted',
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    }
    setLoading(false);
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
      <CardFooter>
        <Button
          disabled={loading}
          variant={'destructive'}
          onClick={() => deleteImage(item?._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectComponent;
