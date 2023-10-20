'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { useDeleteModal } from './modalControl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createAdmin, login } from '@/lib/actions/user';
import { Input } from './ui/input';
import { useUser } from '@/hook/useUser';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(5, {
    message: 'Password must be at least 6 characters.',
  }),
});
type Prop = {
  home?: boolean;
};
const LoginModal = ({ home = false }: Prop) => {
  const { isOpen, login: logiN, onClose, loggedIn } = useUser();

  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (loggedIn && pathname === '/') {
      router.push('/team');
    }
  }, [router, loggedIn, pathname]);

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onInvalid = (errors: any) => console.error(errors);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values.name, values.password);
      logiN();
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Welcome back',
      });

      form.reset();
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid credentials',
      });
    }
    onClose();
  }
  if (!mounted) {
    return null;
  }
  return (
    <Dialog open={home ? true : isOpen}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Login</DialogTitle>
        </DialogHeader>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-5">
              <Button
                disabled={isLoading}
                variant={'purple'}
                className="w-full"
                type="submit"
              >
                Submit
              </Button>
              <Button
                onClick={onClose}
                variant={'destructive'}
                className="w-full"
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
