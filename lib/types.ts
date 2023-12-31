export type Team = {
  name: string;
  job: string;
  imgUrl: string;
  _id: string;
};

export type VolunteerType = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: string;
  address: string;
  skill: string;
  country: string;
  reason: string;
  _id: string;
};
export type EventType = {
  name: string;
  imgUrl: string;
  venue: string;
  date: string;
}[];

export interface Post {
  title: string;
  content: string;
  author: string;
  slug: string;
  tags: string;
  meta: string;
  thumbnail: string | undefined;
}
export interface sortedPost {
  posts: {
    title: string;
    content: string;
    author: string;
    slug: string;
    tags: string[];
    meta: string;
    thumbnail: string | undefined;
    id: string;
    createdAt: string;
  }[];
}
