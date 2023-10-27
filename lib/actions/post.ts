'use server';
import { connectToDB } from '../mongoose';
import { Post as PostType } from '../types';
import { NextResponse } from 'next/server';
import BlogPost from '../model/post';

export async function createPost(post: PostType) {
  // const error = validateSchema(postSchema, post);
  // if (error) return console.log(error);

  const { title, content, author, meta, tags, slug } = post;
  try {
    console.log('post', post);

    connectToDB();
    console.log(post, 'actions/post');
    const slugExists = await BlogPost.findOne({ slug });
    if (slugExists) {
      return new NextResponse('Slug already exists', { status: 400 });
    }
    await BlogPost.create({
      title,
      content,
      author,
      meta,
      tags,
      slug,
    });
    console.log('Post created');
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Goal');
  }
}
