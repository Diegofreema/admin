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
import {
  createProject,
  createProjectVideo,
  editProjectV,
} from '@/lib/actions/user';
import { useEffect, useState } from 'react';
import { useUser } from '@/hook/useUser';
import UploadComponent from '@/components/Upload';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useEditVideo } from '@/hook/useEditVideo';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  videoUrl: z.string().min(2, {
    message: 'videoUrl  is required',
  }),
});
type Props = {};

const AddProjectVideo = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { editData, edit, setEdit } = useEditVideo();
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      videoUrl: '',
    },
  });
  useEffect(() => {
    if (editData) {
      form.setValue('name', editData.name);
      form.setValue('videoUrl', editData.videoUrl);
    }
  }, [form, editData]);

  const isLoading = form.formState.isSubmitting;
  const onInvalid = (errors: any) => console.error(errors);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      edit
        ? await editProjectV(editData.id as any, values.name, values.videoUrl)
        : await createProjectVideo(values.name, values.videoUrl);
      toast({
        variant: 'success',
        title: 'Success',
        description: 'You have added a new project',
      });
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
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video</FormLabel>
                <FormControl>
                  <UploadComponent
                    endpoint="projectVideo"
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProjectVideo;
