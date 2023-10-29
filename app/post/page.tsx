import { fetchAllPosts } from '@/lib/actions/post';

import InfiniteScrollCom from './_components/InfiniteScrollCom';
import { Input } from '@/components/ui/input';
type Props = {};

const Post = async ({}: Props) => {
  const posts = await fetchAllPosts();
  return (
    <div className="py-[100px] min-h-screen w-[90%] mx-auto">
      <div>
        <Input className="w-[200px] outline-none focus:!outline-none focus:!ring-0" />
      </div>
      <h1 className="font-bold text-center underline mb-5">Posts</h1>
      <InfiniteScrollCom posts={posts} />
    </div>
  );
};

export default Post;
