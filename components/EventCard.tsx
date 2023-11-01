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
import { Range, useEditEvent } from '@/hook/useEditEvent';
import moment from 'moment-timezone';

interface EventCardProps {
  name?: string;
  startDate?: string;
  venue?: string;
  imgUrl: string;
  endDate?: string | null;
  id: string;
  heading?: string;
  description?: string;
  type: 'event' | 'slider';
}
const EventCard = ({
  startDate,
  endDate,
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
  const utcMoment = moment.utc(startDate);
  const utcMoment2 = moment.utc(endDate);
  const isDate = utcMoment.tz('Africa/Lagos').format('DD/MM/YYYY');
  const isDate2 = utcMoment2.tz('Africa/Lagos').format('DD/MM/YYYY');

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
    name?: string;
    venue?: string;
    description?: string;
    imgUrl?: string;
    date?: Range;

    id: string;
  }) => {
    getEditEventData({
      name: value.name,
      venue: value.venue,
      description: value.description,
      imgUrl: value.imgUrl,
      //@ts-ignore
      date: {
        range1: {
          startDate: new Date(startDate as any),
          endDate: new Date(endDate as any),
        },
      },

      id,
    });
    setEditEvent();
  };
  const handleEditSlider = ({
    imgUrl,
    startDate,
    endDate,
    name,

    venue,
    description,
    heading,
    id,
  }: {
    name?: string;
    startDate?: any;
    endDate?: any;
    venue?: string;
    imgUrl: string;
    time?: string;
    id: string;
    heading?: string;
    description?: string;
  }) => {
    console.log(id);

    if (pathname === '/event') {
      const range = { range1: { startDate, endDate } };
      handleEditEvent({
        description,
        id,
        imgUrl,
        name,
        venue,
        date: range,
      });
    } else if (pathname === '/slider') {
      {
        handleEdit({ id, imgUrl, description, heading });
      }
    }
  };
  return (
    <Card className=" mb-4 w-full space-x-4">
      <CardContent className="space-y-4   pt-4">
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
              <span>{isDate}</span>
              {endDate && <span> - {isDate2}</span>}
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
      <div className="px-4 ">
        {type === 'event' && (
          <>
            <p className="uppercase    text-sm font-bold">Theme: {name}</p>
            <p className="capitalize  text-sm font-semibold">Venue: {venue}</p>
            <p>Description: {description}</p>
          </>
        )}
      </div>
      <CardFooter className="flex w-full mt-4 justify-between flex-col sm:!flex-row space-y-4 sm:!space-y-0">
        <div className="flex w-full justify-between space-x-4 items-center">
          <Button
            variant={'purple'}
            className="w-full"
            // ts-ignore
            onClick={() =>
              handleEditSlider({
                heading,
                description,
                imgUrl,
                id,
                startDate,
                endDate,
                name,

                venue,
              })
            }
          >
            Edit
          </Button>
          {!loading ? (
            <Button
              className="w-full"
              variant={'destructive'}
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
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
