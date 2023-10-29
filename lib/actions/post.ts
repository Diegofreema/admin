'use server';
import { connectToDB } from '../mongoose';
import { Post as PostType } from '../types';
import { NextResponse } from 'next/server';
import BlogPost from '../model/post';
import { postSchema, validateSchema } from '../validator';
import BlogContent from '../model/post';

export async function createPost(post: PostType) {
  const result = validateSchema(postSchema, post);
  console.log(result);

  if (result === null) throw new Error('Please fill all field');

  const { title, content, author, meta, tags, slug, thumbnail } = post;
  try {
    connectToDB();

    const slugExists = await BlogPost.findOne({ slug });
    if (slugExists) throw new Error('Slug already exists');
    const createdPost = await BlogContent.create({
      title,
      content,
      author,
      meta,
      tags,
      slug,
      thumbnail,
    });
    return createdPost;
  } catch (error: any) {
    console.log(error);

    throw new Error(error?.message);
  }
}
export async function fetchSinglePost(id: string) {
  try {
    connectToDB();

    const slugExists = await BlogContent.findById(id);
    if (!slugExists) {
      return null;
    }

    return {
      id: slugExists?._id.toString(),
      author: slugExists?.author,
      title: slugExists?.title,
      content: slugExists?.content,
      meta: slugExists?.meta,
      tags: slugExists?.tags,
      slug: slugExists?.slug,
      createdAt: slugExists?.createdAt,
      thumbnail: slugExists?.thumbnail,
    };
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Fetch Post');
  }
}
export async function fetchAllPosts() {
  try {
    connectToDB();

    const posts = await BlogContent.find().sort({
      createdAt: 'desc',
    });

    const safePosts = posts?.map((item) => ({
      id: item?._id.toString(),
      author: item?.author,
      title: item?.title,
      content: item?.content,
      meta: item?.meta,
      tags: item?.tags,
      slug: item?.slug,
      createdAt: item?.createdAt.toString(),
      thumbnail: item?.thumbnail,
    }));

    return safePosts;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Fetch Post');
  }
}

export async function deletePost(id: string) {
  try {
    connectToDB();

    await BlogContent.findByIdAndDelete(id);

    return {
      message: 'Post deleted successfully',
    };
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete Post');
  }
}

export async function editPost({
  id,
  thumbnail,
  title,
  content,
  author,
  meta,
  tags,
  slug,
}: {
  id?: string;
  thumbnail: string | undefined;
  title: string;
  content: string;
  author: string;
  meta: string;
  tags: string;
  slug: string;
}) {
  try {
    connectToDB();

    await BlogContent.findOneAndUpdate(
      { _id: id },
      {
        thumbnail,
        title,
        content,
        author,
        meta,
        tags,
        slug,
      }
    );

    return {
      message: 'Post updated successfully',
    };
  } catch (error) {
    console.log(error);

    throw new Error('Failed to update Post');
  }
}
