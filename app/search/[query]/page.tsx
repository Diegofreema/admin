import { getSearchedPosts } from '@/lib/actions/post';
import { NextPage } from 'next';
import Search from '../_component/Search';

interface Props {
  params: { query: string };
}

const page: NextPage<Props> = async ({ params }): Promise<JSX.Element> => {
  const { query } = params;

  const posts = await getSearchedPosts(query);
  return (
    <div className="py-[100px] min-h-screen w-[90%] mx-auto">
      <h1 className="font-bold text-center underline mb-5">Posts</h1>
      <Search allPosts={posts} query={query} />
    </div>
  );
};

export default page;
