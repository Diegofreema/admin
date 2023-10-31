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
import { Button } from './ui/button';
import UploadComponent from './Upload';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { createProject, editProject } from '@/lib/actions/user';
import { useEffect, useState } from 'react';
import { useUser } from '@/hook/useUser';
import { useProjectEdit } from '@/hook/useEditProject';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  imageUrl: z.string().min(2, {
    message: 'Image is required',
  }),
});
type Props = {};

const AddProject = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { edit, editData, setEdit } = useProjectEdit();
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

  useEffect(() => {
    setIsMounted(true);
  }, []);
  console.log(editData);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: editData.name || '',
      imageUrl: editData.imgUrl || '',
    },
  });
  useEffect(() => {
    if (editData) {
      form.setValue('name', editData.name);
      form.setValue('imageUrl', editData.imgUrl);
    }
  }, [form, editData]);

  const isLoading = form.formState.isSubmitting;
  const onInvalid = (errors: any) => console.error(errors);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      edit
        ? await editProject(editData?.id as any, values.name, values.imageUrl)
        : await createProject(values.name, values.imageUrl);
      toast({
        variant: 'success',
        title: 'Success',
        description: edit
          ? 'You have updated a project'
          : 'You have added a new project',
      });
      edit && setEdit();
      form.reset();
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong',
      });
    }
  }
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="!space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Of Project</FormLabel>
                <FormControl>
                  <Input placeholder="Name Of Project" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <UploadComponent
                    endpoint="projectImage"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            variant={'purple'}
            className="w-full"
            type="submit"
          >
            {edit ? 'Update' : ' Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProject;
