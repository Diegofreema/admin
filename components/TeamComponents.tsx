'use client';
import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter } from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { useDeleteModal } from './modalControl';
import { useUser } from '@/hook/useUser';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
type Props = {
  imgUrl: string;
  name: string;
  job: string;
  id: string;
};

const TeamComponents = ({ id, imgUrl, name, job }: Props) => {
  const { onOpen, getId } = useDeleteModal();
  const { loggedIn } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    if (!loggedIn) {
      router.push('/');
      toast({
        variant: 'destructive',
        title: 'Unauthorized',
        description: 'Please login',
      });
    }
  }, [toast, router, loggedIn]);

  const handleDelete = async (teamId: string) => {
    onOpen();
    getId(teamId);
  };
  return (
    <Card className="!h-fit mb-4">
      <CardContent className="flex justify-between flex-col sm:!flex-row space-y-2 items-center pt-4">
        <div className="rounded-full relative w-20 h-20 overflow-hidden">
          <Image
            fill
            priority
            alt="image"
            src={imgUrl}
            className=" object-cover"
          />
        </div>
        <div>
          <p className="uppercase text-bold">{name}</p>
          <p className="capitalize text-semibold">{job}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => handleDelete(id)}
          className="w-full"
          size={'lg'}
          variant={'destructive'}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamComponents;
