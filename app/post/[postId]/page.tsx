import { buttonVariants } from '@/components/ui/button';
import { fetchSinglePost } from '@/lib/actions/post';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';
import Head from 'next/head';
import Image from 'next/image';
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
  const tags = post?.tags.join(', ');
  return (
    <div className="w-[80%] mx-auto min-h-screen py-[50px] space-y-5">
      <Head>
        <title>{post?.title}</title>
        <meta name="description" content={post?.meta} />
        <meta name="keywords" content={tags} />
      </Head>
      <div className="flex justify-end items-center">
        <div className="max-w-fit">
          <Link
            href={`/post/edit/${post?.id}`}
            className={buttonVariants({ variant: 'purple' })}
          >
            Edit
          </Link>
        </div>
      </div>
      {post?.thumbnail && (
        <div className="relative aspect-video">
          <Image src={post?.thumbnail} alt="thumbnail" fill priority />
        </div>
      )}
      <div className="flex items-center justify-between">
        {post?.tags.map((tag, i) => (
          <span key={i} className="tag">
            #{tag}
          </span>
        ))}
        <span>{dateFormat(post?.createdAt, 'd-mmm-yyyy')}</span>
      </div>
      <div className="prose prose-lg max-w-full mx-auto space-y-5">
        <h1 className="font-bold text-3xl">{post?.title}</h1>
        {parse(post?.content)}
      </div>
    </div>
  );
};

export default page;
