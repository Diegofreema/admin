'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { createSlider, editSlider } from '@/lib/actions/slider';
import UploadComponent from '@/components/Upload';
import { Button } from '@/components/ui/button';
import { useEdit } from '@/hook/useEdit';
import { set } from 'nprogress';

type Props = {};

const AddSlider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { editData, edit, setEdit } = useEdit();
  const [values, setValues] = useState(editData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setValues(editData);
  }, [editData]);
  const requiredFields = ['heading', 'description', 'imgUrl'];
  const emptyFields = requiredFields.filter(
    (field) => !values[field as keyof Props]
  );

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(e: any) {
    e.preventDefault();
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
    setLoading(true);
    try {
      edit && setEdit();
      edit
        ? await editSlider(
            editData.id,
            values.heading as any,
            values.imgUrl,
            values.description as any
          )
        : await createSlider(
            values.heading as any,
            values.imgUrl,
            values.description as any
          );
      toast({
        variant: 'success',
        title: 'Success',
        description: edit
          ? 'You have edited a slider'
          : 'You have added a slider',
      });
      setValues({
        heading: '',
        imgUrl: '',
        description: '',
        id: '',
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  }
  if (!isMounted) return null;
  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        <Input
          placeholder="Heading"
          value={values.heading}
          onChange={(e) => {
            setValues((prev) => ({
              ...prev,
              heading: e.target.value,
            }));
          }}
        />
        <Input
          placeholder="Description"
          value={values.description}
          onChange={(e) => {
            setValues((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        />

        <UploadComponent
          endpoint="sliderImg"
          value={values.imgUrl}
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
          {edit ? 'Update' : ' Submit'}
        </Button>
      </form>
    </div>
  );
};

export default AddSlider;
