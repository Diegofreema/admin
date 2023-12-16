'use server';

import { connectToDB } from '../mongoose';
import Team from '../model/team';
import Gallery from '../model/gallery';
import Video from '../model/video';
import Project from '../model/project';

import Volunteer from '../model/volunteer';
import bcrypt from 'bcrypt';
import Admin from '../model/admin';
import ProjectVideo from '../model/projectVideos';

import myEvent from '../model/myEvents';
import ev from '../model/ev';

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
  date: { startDate: string; endDate?: string },
  name?: string,
  imgUrl?: string,
  venue?: string,
  description?: string
) {
  console.log(date);

  try {
    connectToDB();

    await ev.create({
      name,
      imgUrl,
      venue,
      startDate: date.startDate,
      enDate: date.endDate,
      description,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to Create Event');
  }
}

export interface TDate {
  startDate: string;
  endDate?: string;
}
export async function editEvent(
  date: TDate,
  id: string,
  name?: string,
  imgUrl?: string,
  venue?: string,
  description?: string
) {
  try {
    connectToDB();
    const { startDate, endDate } = date;

    await ev.findByIdAndUpdate(
      { _id: id },
      {
        name,
        imgUrl,
        venue,
        startDate,
        enDate: endDate,
        description,
      }
    );
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

    throw new Error('Failed to create project');
  }
}
export async function editProject(id: string, name: string, imgUrl: string) {
  try {
    connectToDB();

    await Project.findByIdAndUpdate(
      { _id: id },
      {
        name,
        imgUrl,
      }
    );
  } catch (error) {
    console.log(error);

    throw new Error('Failed to update project');
  }
}
export async function editProjectV(id: string, name: string, videoUrl: string) {
  try {
    connectToDB();

    await ProjectVideo.findByIdAndUpdate(
      { _id: id },
      {
        name,
        videoUrl,
      }
    );
  } catch (error) {
    console.log(error);

    throw new Error('Failed to update project');
  }
}
export async function deleteProject(id: string) {
  try {
    connectToDB();

    await Project.findByIdAndDelete({
      _id: id,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete project');
  }
}
export async function deleteProjectV(id: string) {
  try {
    connectToDB();

    await ProjectVideo.findByIdAndDelete({
      _id: id,
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed to delete project');
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
  console.log(id);

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

    const images = await Gallery.find().sort({ createdAt: 'asc' });
    return images;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get Images');
  }
}
export async function fetchVideos() {
  try {
    connectToDB();

    const videos = await Video.find().sort({ createdAt: 'asc' });
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
      _id: item?._id.toString(),
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
        _id: item?._id.toString(),
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
        _id: item?._id.toString(),
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

    const EventModels = await ev.find();

    const safeFoundationEvents = EventModels?.map((item) => ({
      name: item?.name,
      venue: item?.venue,
      imgUrl: item?.imgUrl,
      startDate: item?.startDate?.toString(),
      endDate: item?.enDate?.toString(),
      _id: item?._id.toString(),
      description: item?.description,
    }));
    return safeFoundationEvents;
  } catch (error) {
    console.log(error);

    throw new Error('Failed to get EventModels');
  }
}
export async function deleteEvent(id: string) {
  try {
    connectToDB();

    await ev.findByIdAndDelete(id);
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
