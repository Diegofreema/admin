'use client';

import dateFormat from 'dateformat';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { fetchAllPosts, getSearchedPosts } from '@/lib/actions/post';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostCard from '@/app/post/_components/PostCard';
const maxPostsPerPage = 10;

export type Post = {
  allPosts:
    | {
        id: string;
        author: string;
        title: string;
        content: string;
        meta: string;
        tags: string[];
        slug: string;
        createdAt: string;
        thumbnail: string;
      }[]
    | undefined;
  query: string;
};
const Search = ({ allPosts, query }: Post): JSX.Element => {
  const {
    isPending,
    isError,
    error,
    data: posts,
  } = useQuery({
    queryKey: ['searchPosts'],
    queryFn: () => getSearchedPosts(query),
    initialData: allPosts,
  });
  // async () =>  await fetchAllPosts(page);

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl mt-[100px]  text-center font-semibold">
          Something went wrong!
        </h1>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl text-center mt-[100px]  font-semibold">
          Loading...
        </h1>
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl text-center mt-[100px]  font-semibold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="grid !grid-cols-1   md:!grid-cols-3 w-[80%] mx-auto gap-5">
        {Array.isArray(posts) &&
          posts?.map((post) => {
            const tags = post?.tags?.map((tag: string) => (
              <span key={tag}>#{tag}</span>
            ));
            const formattedDate = dateFormat(post?.createdAt, 'd-mmm-yyyy');

            return (
              <PostCard
                key={post.id}
                post={post}
                tags={tags}
                formattedDate={formattedDate}
              />
            );
          })}
      </div>
      <div className="flex items-center justify-center">
        {Array.isArray(posts) && posts.length < 1 && (
          <p className="mt-[100px] text-center w-full">No Posts found</p>
        )}
      </div>
    </>
  );
};

export default Search;
