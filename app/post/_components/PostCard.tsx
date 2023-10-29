'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { deletePost } from '@/lib/actions/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Props {
  post: {
    id: string;
    title: string;
    meta: string;
    thumbnail: string | undefined;

    createdAt: string;
  };
  tags: JSX.Element[];
  formattedDate: string;
}

const PostCard: FC<Props> = ({
  post,
  formattedDate,
  tags,
}): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  const { toast } = useToast();
  const trimText = (text: string, trimBy: number) => {
    if (text.length <= trimBy) {
      return text;
    }
    return text.substring(0, trimBy) + '...';
  };
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      await deletePost(id);
    },
    onSuccess: () => {
      // Invalidate and refetch
      toast({
        title: 'Post Deleted',
        variant: 'success',
        description: 'Post deleted successfully',
      });
      router.refresh();
    },
  });

  if (!isMounted) return null;
  return (
    <Card key={post.id} className="cursor-pointer shadow-black/50 shadow-md">
      <Link href={`/post/${post.id}`}>
        <CardHeader>
          <div className="w-full h-[200px] flex items-center justify-center relative overflow-hidden">
            {post?.thumbnail && (
              <Image
                fill
                src={post?.thumbnail}
                alt="Image"
                className="object-cover"
              />
            )}
            {!post?.thumbnail && <h3 className="text-center">No image</h3>}
          </div>
          <CardDescription className="flex justify-between py-4  px-6 items-center">
            <p className="">{tags}</p>
            <p>{formattedDate}</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 !min-h-[100px]  px-6">
          <h3 className="font-semibold first-letter:capitalize">
            {trimText(post?.title, 20)}
          </h3>
          <p className="first-letter:capitalize">{trimText(post?.meta, 70)}</p>
        </CardContent>
      </Link>
      <CardFooter>
        <div className="flex justify-end  ">
          <Button
            disabled={isPending}
            onClick={() => mutate(post.id)}
            variant={'destructive'}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
