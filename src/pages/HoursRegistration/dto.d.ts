export type projectType = {
  _id: string;
  name: string;
};

export type userType = {
  _id: string;
  name: string;
  email: string;
};

export type payloadTypes = {
  hours: number;
  day: string;
  project: string;
  user: string;
};
