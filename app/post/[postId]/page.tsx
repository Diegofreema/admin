import ActionButton from '@/app/blog/_component/ActionButton';
import { Button, buttonVariants } from '@/components/ui/button';
import { fetchSinglePost } from '@/lib/actions/post';
import Link from 'next/link';

const page = async ({ params }: { params: { postId: string } }) => {
  const post = await fetchSinglePost(params?.postId);

  if (post === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-semibold">Post not found</h1>
      </div>
    );
  }
  return (
    <div className="w-[80%] mx-auto min-h-screen py-[100px]">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold first-letter:capitalize">
          {post?.title}
        </h1>
        <div className="max-w-fit">
          <Link
            href={`/post/edit/${post?.id}`}
            className={buttonVariants({ variant: 'purple' })}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
