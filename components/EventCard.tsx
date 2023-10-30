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
import { Button } from './ui/button';
import { useEdit } from '@/hook/useEdit';
import { useEditEvent } from '@/hook/useEditEvent';
import moment from 'moment-timezone';

interface EventCardProps {
  name?: string;
  date?: Date;
  venue?: string;
  imgUrl: string;

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

  id,
  type = 'event',
  heading,
  description,
}: EventCardProps) => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { loggedIn } = useUser();
  const { getEditData, setEdit } = useEdit();
  const { getEditData: getEditEventData, setEdit: setEditEvent } =
    useEditEvent();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const utcMoment = moment.utc(date);
  const isDate = utcMoment.tz('Africa/Lagos').format('DD/MM/YYYY');
  const time = utcMoment.tz('Africa/Lagos').format('hh:mm A');
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
  const handleEdit = (value: {
    heading?: string;
    description?: string;
    imgUrl: string;
    id: string;
  }) => {
    getEditData({
      heading: value.heading,
      description: value.description,
      imgUrl: value.imgUrl,
      id,
    });
    setEdit();
  };

  const handleEditEvent = (value: {
    eventName?: string;
    venue?: string;
    description?: string;
    imgUrl?: string;
    date?: string;
    id: string;
  }) => {
    getEditEventData({
      eventName: value.eventName,
      venue: value.venue,
      description: value.description,
      imgUrl: value.imgUrl,
      date: value.date as any,
      id,
    });
    setEditEvent();
  };
  const handleEditSlider = ({
    imgUrl,
    date,
    name,

    venue,
    description,
    heading,
    id,
  }: {
    name?: string;
    date?: any;
    venue?: string;
    imgUrl: string;
    time?: string;
    id: string;
    heading?: string;
    description?: string;
  }) => {
    if (pathname === '/event') {
      handleEditEvent({
        date,
        description,
        id,
        imgUrl,
        eventName: name,
        venue,
      });
    } else if (pathname === '/slider') {
      {
        handleEdit({ id, imgUrl, description, heading });
      }
    }
  };
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
              <p>Date: {isDate}</p>
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
        <div className="flex justify-between space-x-4 items-center">
          <Button
            variant={'ghost'}
            // ts-ignore
            onClick={() =>
              handleEditSlider({
                heading,
                description,
                imgUrl,
                id,
                date,
                name,

                venue,
              })
            }
          >
            Edit
          </Button>
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
