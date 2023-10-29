import { fetchAllPosts } from '@/lib/actions/post';

import InfiniteScrollCom from './_components/InfiniteScrollCom';
type Props = {};

const Post = async ({}: Props) => {
  const posts = await fetchAllPosts();
  return (
    <div className="py-[100px] min-h-screen">
      <h1 className="font-bold text-center underline mb-5">Posts</h1>
      <InfiniteScrollCom posts={posts} />
    </div>
  );
};

export default Post;
