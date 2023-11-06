'use client';
import React, { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useRouter } from 'next/navigation';
import { createMember } from '@/lib/actions/user';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { createObj, editObj } from '@/lib/actions/writeUps';
import { useEditObj } from '@/hook/useEditObj';

type Props = {};

const AddMemberForm = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { editData, edit, setEdit } = useEditObj();
  const [values, setValues] = useState(editData);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setValues(editData);
  }, [editData]);
  const { toast } = useToast();
  const router = useRouter();
  const requiredFields = ['heading', 'description'];
  const emptyFields = requiredFields.filter(
    (field) => !values[field as keyof Props]
  );
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
        ? await editObj(editData.id, values.heading, values.description)
        : await createObj(values.heading, values.description);
      toast({
        variant: 'success',
        title: 'Success',
        description: edit
          ? 'You have edited an Objective'
          : 'You have added an Objective',
      });
      setValues({
        heading: '',
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
  if (!isMounted) {
    return null;
  }
  return (
    <div className="">
      <div className="">
        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            className="w-full"
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
            className="w-full"
            placeholder="Description"
            value={values.description}
            onChange={(e) => {
              setValues((prev) => ({
                ...prev,
                description: e.target.value,
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
    </div>
  );
};

export default AddMemberForm;
