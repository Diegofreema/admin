import { Props } from '@/app/blog/_component/Editor';
import { SeoResult } from '@/app/blog/_component/SeoForm';
import BlogPost from '@/lib/model/post';
import { connectToDB } from '@/lib/mongoose';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
interface PostResponse extends Props {
  id: string;
}

const page = async () => {
  return <div>dynamic page</div>;
};

export default page;
interface ServerProps {
  post: PostResponse;
}
