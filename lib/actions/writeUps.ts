'use server';

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
export async function editGoal(
  id: string,
  heading: string,
  description: string
) {
  try {
    connectToDB();

    const goals = await Goal.findByIdAndUpdate(id, {
      heading,
      description,
    });
    return goals;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to update Goals');
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
export async function editObj(
  id: string,
  heading: string,
  description: string
) {
  try {
    connectToDB();

    await Obj.findByIdAndUpdate(id, {
      heading,
      description,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to update Objectives');
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
export async function editPr(id: string, heading: string, description: string) {
  try {
    connectToDB();

    const priorities = await Priority.findByIdAndUpdate(id, {
      heading,
      description,
    });
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
