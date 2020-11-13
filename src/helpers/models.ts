interface Location {
  coordinates: number[];
  type: string;
}

export interface Place {
  _id?: string;
  name: string;
  city: string;
  location: Location;
  zipCode: string;
  address: string;
  image?: string;
  _ownerId?: string;
  _createdAt?: Date;
  __v?: number;
}