'use client';

import { FormEventHandler, useState } from 'react';
import InfiniteScrollCom from './_components/InfiniteScrollCom';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
type Props = {};

const Post = ({}: Props) => {
  const [query, setQuery] = useState('');
  const { push } = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    push(`/search/${query}`);
  };
  return (
    <div className="py-[100px] min-h-screen w-[90%] mx-auto">
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-[200px] outline-none focus:!outline-none focus:!ring-0"
          />
        </form>
      </div>
      <h1 className="font-bold text-center underline mb-5">Posts</h1>
      <InfiniteScrollCom />
    </div>
  );
};

export default Post;
