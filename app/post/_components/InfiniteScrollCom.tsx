'use client';
import PostCard from './PostCard';
import dateFormat from 'dateformat';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchAllPosts } from '@/lib/actions/post';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
const maxPostsPerPage = 10;
const InfiniteScrollCom = (): JSX.Element => {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const {
    isPending,
    isError,
    error,
    data: posts,
  } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchAllPosts(page),
    placeholderData: keepPreviousData,
  });
  // async () =>  await fetchAllPosts(page);

  if (isError) {
    return (
      <h1 className="text-2xl  text-center font-semibold">
        Something went wrong!
      </h1>
    );
  }

  if (isPending) {
    return <h1 className="text-2xl text-center  font-semibold">Loading...</h1>;
  }
  if (isPending) {
    return <h1 className="text-2xl text-center  font-semibold">Loading...</h1>;
  }

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        <>
          <div className="grid !grid-cols-1  md:!grid-cols-3 w-[80%] mx-auto gap-5">
            {Array.isArray(posts) &&
              posts?.map((post) => {
                const tags = post?.tags?.map((tag) => (
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
          <div className="flex items-center w-full justify-center space-x-4 mt-6">
            <Button
              className="border bg-black p-2 rounded-md inline-block  text-white"
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={isPending || page === 0}
            >
              Previous Page
            </Button>{' '}
            <Button
              className="border bg-black p-2 rounded-md inline-block text-white"
              disabled={
                isPending ||
                (Array.isArray(posts) && posts.length < maxPostsPerPage)
              }
              onClick={() => {
                setPage((old) => old + 1);
              }}
              // Disable the Next Page button until we know a next page is available
            >
              Next Page
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center font-semibold">
          <h1>No Articles yet</h1>
        </div>
      )}
    </>
  );
};

export default InfiniteScrollCom;
