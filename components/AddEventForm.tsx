'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import DateTimePicker from 'react-datetime-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { DateRangePicker } from 'react-date-range';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import UploadComponent from './Upload';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { createEvent, editEvent } from '@/lib/actions/user';
import { useEffect, useState } from 'react';
import { useEditEvent } from '@/hook/useEditEvent';

type Props = {};

const AddEvent = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { toast } = useToast();
  const router = useRouter();
  const { editData, edit, setEdit } = useEditEvent();
  const [values, setValues] = useState(editData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setValues(editData);
  }, [editData]);
  const requiredFields = ['name', 'venue', 'description', 'imgUrl'];
  const emptyFields = requiredFields.filter(
    (field) => !values[field as keyof Props]
  );
  async function onSubmit(e: any) {
    e.preventDefault();
    edit && setEdit();
    if (emptyFields.length) {
      toast({
        variant: 'destructive',
        title: `${emptyFields.join(' and ').toUpperCase()} ${
          emptyFields.length > 1 ? 'are' : 'is'
        } required`,
        description: 'Please fill required fields',
      });
      return;
    }
    if (values.date && values.date.range1.startDate < new Date()) {
      toast({
        variant: 'destructive',
        title: 'Invalid Date',
        description: 'Please select a valid date',
      });
      return;
    }

    console.log(values);

    setLoading(true);
    console.log(values.date.range1);

    try {
      edit
        ? await editEvent(
            values.date.range1 as any,
            editData.id,
            values.name,
            values.imgUrl,
            values.venue,
            values.description
          )
        : await createEvent(
            values.date.range1 as any,
            values.name,
            values.imgUrl,
            values.venue,
            values.description
          );
      toast({
        variant: 'success',
        title: 'Success',
        description: edit
          ? 'You have updated an Event'
          : 'You have added a new Event',
      });
      setValues({
        name: '',
        venue: '',
        description: '',
        imgUrl: '',
        date: { range1: { startDate: new Date(), endDate: new Date() } },
        id: '',
      });
      router.refresh();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }
  if (!isMounted) return null;
  return (
    <div>
      <form onSubmit={onSubmit} className="!space-y-4">
        <Input
          placeholder="Event Name"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />

        <Input
          placeholder="Venue"
          value={values.venue}
          onChange={(e) => setValues({ ...values, venue: e.target.value })}
        />

        <Textarea
          placeholder="Description"
          className="resize-none"
          value={values.description}
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
        />

        {/* <DateTimePicker
          className={'!border-transparent !pr-3 w-full  '}
          onChange={(date) => setValues({ ...values, date: date as any })}
          value={values.date as any}
          clearIcon={null}
        /> */}
        <DateRangePicker
          ranges={[values.date.range1]}
          onChange={(date) => setValues({ ...values, date: date as any })}
        />

        <UploadComponent
          endpoint="eventImage"
          value={values.imgUrl as any}
          onChange={(url: any) => {
            setValues((prev) => ({
              ...prev,
              imgUrl: url,
            }));
          }}
        />

        <Button
          disabled={loading}
          variant={'purple'}
          className="w-full"
          type="submit"
        >
          {edit ? 'Update' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default AddEvent;
