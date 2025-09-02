import { ObjectId } from 'mongodb';

export interface Post {
  _id?: ObjectId | string;
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  createdAt: string;
  author: string;
  location: string;
}
