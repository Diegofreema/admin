'use server';

import { connectToDB } from '../mongoose';
import Team from '../model/team';
import Gallery from '../model/gallery';
import Video from '../model/video';
import Project from '../model/project';

import { EventType } from '../types';
import Volunteer from '../model/volunteer';
import bcrypt from 'bcrypt';
import Admin from '../model/admin';
import ProjectVideo from '../model/projectVideos';
import EventModel from '../model/eventModel';

export async function createMember(name: string, job: string, imgUrl: string) {
  try {
    connectToDB();

    await Team.create({
      name: name.toLowerCase(),
      job,
      imgUrl,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Member');
  }
}
export async function editMember(
  id: string,
  name: string,
  job: string,
  imgUrl: string
) {
  try {
    connectToDB();

    await Team.findByIdAndUpdate(id, {
      name: name.toLowerCase(),
      job,
      imgUrl,
    });
  } catch (error) {
    console.log(error);

    return { message: 'Failed to edit Member' };
  }
}
export async function createVideo(videoUrl: string) {
  try {
    connectToDB();

    await Video.create({
      videoUrl,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Member');
  }
}
export async function createImage(imgUrl: string) {
  try {
    connectToDB();

    await Gallery.create({
      imgUrl,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Member');
  }
}
export async function createEvent(
  name?: string,
  imgUrl?: string,
  venue?: string,
  date?: Date,
  description?: string
) {
  console.log(description);

  try {
    connectToDB();

    await EventModel.create({
      name,
      imgUrl,
      venue,
      date,
      description,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Event');
  }
}
export async function editEvent(
  id: string,
  name?: string,
  imgUrl?: string,
  venue?: string,
  date?: Date,
  description?: string
) {
  try {
    connectToDB();

    await EventModel.findByIdAndUpdate(id, {
      name,
      imgUrl,
      venue,
      date,
      description,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to edit Event');
  }
}
export async function createProject(name: string, imgUrl: string) {
  try {
    connectToDB();

    await Project.create({
      name,
      imgUrl,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Member');
  }
}
export async function createProjectVideo(name: string, videoUrl: string) {
  try {
    connectToDB();

    await ProjectVideo.create({
      name,
      videoUrl,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to add Project Video');
  }
}
export async function deleteProjectVideo(id: string) {
  try {
    connectToDB();

    await ProjectVideo.findByIdAndDelete({
      _id: id,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete Project Video');
  }
}
export async function deleteProjectImg(id: string) {
  try {
    connectToDB();

    await Project.findByIdAndDelete({
      _id: id,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete Project image');
  }
}
export async function fetchTeam() {
  try {
    connectToDB();

    const team = await Team.find();
    return team;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Members');
  }
}
export async function fetchGallery() {
  try {
    connectToDB();

    const images = await Gallery.find();
    return images;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Images');
  }
}
export async function fetchVideos() {
  try {
    connectToDB();

    const videos = await Video.find();
    return videos;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Videos');
  }
}
export async function fetchVolunteers() {
  try {
    connectToDB();

    const volunteer = await Volunteer.find();
    const safeVolunteer = volunteer?.map((item) => ({
      email: item?.email,
      firstName: item?.firstName,
      lastName: item?.lastName,
      phoneNumber: item?.phoneNumber,
      dob: item?.dob.toString(),
      address: item?.address,
      skill: item?.skill,
      country: item?.country,
      reason: item?.reason,
      _id: item?._id,
    }));
    return safeVolunteer;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Projects');
  }
}
export async function fetchProject() {
  try {
    connectToDB();

    const projects = await Project.find();
    const safeProjects = projects?.map((item) => {
      return {
        name: item?.name,
        imgUrl: item?.imgUrl,
        _id: item?._id,
      };
    });
    return safeProjects;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Project Images');
  }
}
export async function fetchProjectVideos() {
  try {
    connectToDB();

    const projects = await ProjectVideo.find();
    const safeProjects = projects?.map((item) => {
      return {
        name: item?.name,
        videoUrl: item?.videoUrl,
        _id: item?._id,
      };
    });
    return safeProjects;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Project Videos');
  }
}

export async function fetchEvent() {
  try {
    connectToDB();

    const EventModels = await EventModel.find();

    const safeEventModels = EventModels?.map((item) => ({
      name: item?.name,
      venue: item?.venue,
      imgUrl: item?.imgUrl,
      date: item?.date?.toString(),
      _id: item?._id,
      description: item?.description,
    }));
    return safeEventModels;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get EventModels');
  }
}
export async function deleteEvent(id: string) {
  try {
    connectToDB();

    await EventModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete EventModels');
  }
}
export async function deleteMember(id: string) {
  try {
    connectToDB();

    await Team.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete Member');
  }
}
export async function deleteVolunteer(id: string) {
  try {
    connectToDB();

    await Volunteer.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete Volunteer');
  }
}

export async function createAdmin(name: string, password: string) {
  try {
    connectToDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      password: hashedPassword,
    });
    return {
      name: admin.name,
    };
  } catch (error) {
    throw new Error('Failed to create admin');
  }
}
export async function login(name: string, password: string) {
  try {
    connectToDB();

    const admin = await Admin.findOne({
      name,
    });
    if (!admin || !admin?.password) {
      throw new Error('Invalid credentials');
    }
    const isCorrectPassword = await bcrypt.compare(password, admin?.password);
    if (!isCorrectPassword) {
      throw new Error('Invalid credentials');
    }

    return {
      name: admin?.name,
    };
  } catch (error) {
    console.log(error);

    throw new Error('Failed to login ');
  }
}
