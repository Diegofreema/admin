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
import { Button } from './ui/button';
import UploadComponent from './Upload';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';
import { createImage } from '@/lib/actions/user';
import { useEffect, useState } from 'react';
import { useUser } from '@/hook/useUser';

const formSchema = z.object({
  imageUrl: z.string().min(2, {
    message: 'Image  is required',
  }),
});

type Props = {};

const AddImage = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const { loggedIn } = useUser();
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
      imageUrl: '',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onInvalid = (errors: any) => console.error(errors);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createImage(values.imageUrl);
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Upload successful',
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Image</FormLabel>
                <FormControl>
                  <UploadComponent
                    endpoint="galleryImg"
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

export default AddImage;
