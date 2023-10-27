'use server';

import cloudinary from '../cloudinary';
import Goal from '../model/goals';
import Obj from '../model/object';
import Priority from '../model/priorities';
import { connectToDB } from '../mongoose';

export async function createGoal(heading: string, description: string) {
  try {
    connectToDB();

    await Goal.create({
      heading,
      description,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Goal');
  }
}
export async function fetchGoal() {
  try {
    connectToDB();

    const goals = await Goal.find();
    return goals;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Goals');
  }
}
export async function createObj(heading: string, description: string) {
  try {
    connectToDB();

    await Obj.create({
      heading,
      description,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Objective');
  }
}
export async function fetchObj() {
  try {
    connectToDB();

    const objectives = await Obj.find();
    return objectives;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Objectives');
  }
}
export async function createPriority(heading: string, description: string) {
  try {
    connectToDB();

    await Priority.create({
      heading,
      description,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Priority');
  }
}
export async function fetchPriorities() {
  try {
    connectToDB();

    const priorities = await Priority.find();
    return priorities;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Priorities');
  }
}

export async function deletePriority(id: string) {
  try {
    connectToDB();

    await Priority.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete Priority');
  }
}
export async function deleteGoal(id: string) {
  try {
    connectToDB();

    await Goal.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete goal');
  }
}
export async function deleteObj(id: string) {
  try {
    connectToDB();

    await Obj.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete objective');
  }
}

export const cloudinaryUpload = async (fileToUpload: string) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: 'image',
      folder: 'blog',
    });
    return {
      image: data?.secure_url,
    };
  } catch (e) {
    console.log('error', e);
  }
};
export type Images = {
  images: {
    src: string;
  }[];
};

export const readAllImages = async () => {
  try {
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'blog',
      resource_type: 'image',
    });
    const images = resources.map((image: any) => {
      return { src: image?.secure_url };
    });
    return images;
  } catch (e) {
    console.log('error', e);
  }
};
