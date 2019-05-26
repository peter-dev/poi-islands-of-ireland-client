export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  admin: boolean;
  _id: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Region {
  _id: string,
  name: string,
  identifier: string,
  location: Location,
  createdAt: string,
  updatedAt: string
}

export interface Island {
  _id: string,
  name: string,
  description: string,
  location: Location,
  region: string,
  createdBy: string,
  createdAt: string,
  updatedAt: string
}

export interface Rating {
  _id: string,
  score: number,
  user: string,
  island: string
}
