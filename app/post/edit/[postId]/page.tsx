import Editor from '@/app/blog/_component/Editor';
import { fetchSinglePost } from '@/lib/actions/post';
import React from 'react';

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
    <div>
      <Editor initialValue={post} />
    </div>
  );
};

export default page;
