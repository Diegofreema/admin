'use client';
import { FC, useOptimistic, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from './PostCard';
import dateFormat from 'dateformat';
import { fetchAllPosts } from '@/lib/actions/post';
import { sortedPost } from '@/lib/types';

interface Props {
  posts: {
    title: string;
    content: string;
    author: string;
    slug: string;
    tags: string[];
    meta: string;
    thumbnail: string | undefined;
    id: string;
    createdAt: string;
  }[];
}

const InfiniteScrollCom: FC<Props> = ({ posts }): JSX.Element => {
  return (
    <div className="grid !grid-cols-1  md:!grid-cols-3 w-[80%] mx-auto gap-5">
      {posts?.map((post) => {
        const tags = post?.tags?.map((tag) => <span key={tag}>#{tag}</span>);
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
  );
};

export default InfiniteScrollCom;
