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
