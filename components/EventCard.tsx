'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { ColorRing } from 'react-loader-spinner';
import { useDeleteModal } from './modalControl';
import { useUser } from '@/hook/useUser';

interface EventCardProps {
  name?: string;
  date?: string;
  venue?: string;
  imgUrl: string;
  time?: string;
  id: string;
  heading?: string;
  description?: string;
  type: 'event' | 'slider';
}
const EventCard = ({
  date,
  imgUrl,
  name,
  venue,
  time,
  id,
  type = 'event',
  heading,
  description,
}: EventCardProps) => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { loggedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();
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

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { onOpen, getId } = useDeleteModal();
  const handleDelete = async (id: string) => {
    onOpen();
    getId(id);
  };
  if (!isMounted) {
    return null;
  }

  return (
    <Card className=" mb-4 w-full">
      <CardContent className="space-y-2   pt-4">
        <div className="rounded-md relative w-[100%] h-[200px] overflow-hidden">
          <Image
            fill
            priority
            alt="image"
            src={imgUrl}
            className=" object-cover"
          />
        </div>
        <div>
          {type === 'event' && (
            <>
              {' '}
              <p>Date: {date}</p>
              <p>Time: {time}</p>
              <p></p>
            </>
          )}
          {type === 'slider' && (
            <>
              <p>Heading: {heading}</p>
              <p>Description: {description}</p>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between flex-col sm:!flex-row space-y-4 sm:!space-y-0">
        <div>
          {type === 'event' && (
            <>
              <p className="uppercase    text-sm font-bold">Theme: {name}</p>
              <p className="capitalize  text-sm font-semibold">
                Venue: {venue}
              </p>
              <p>Description: {description}</p>
            </>
          )}
        </div>
        {!loading ? (
          <IconTrash
            size={30}
            color="red"
            className="cursor-pointer"
            onClick={() => handleDelete(id)}
          />
        ) : (
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="blocks-loading"
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
