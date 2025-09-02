'use server';

import type { Post } from './definitions';
import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

async function getCollection() {
  const db = await connectToDatabase();
  return db.collection<Omit<Post, 'id'>>('posts');
}

function mapPost(post: any): Post {
  const { _id, ...rest } = post;
  return {
    ...rest,
    id: _id.toHexString(),
  };
}

export const getPosts = async (): Promise<Post[]> => {
  const collection = await getCollection();
  const posts = await collection.find().sort({ createdAt: -1 }).toArray();
  return posts.map(mapPost);
};

export const getPaginatedPosts = async ({ page, limit }: { page: number, limit: number }): Promise<{ posts: Post[], totalPages: number }> => {
  const collection = await getCollection();
  const postsPromise = collection.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();
  
  const countPromise = collection.countDocuments();

  const [posts, totalPosts] = await Promise.all([postsPromise, countPromise]);

  const totalPages = Math.ceil(totalPosts / limit);
  return { posts: posts.map(mapPost), totalPages };
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
    if (!ObjectId.isValid(id)) {
        return undefined;
    }
    const collection = await getCollection();
    const post = await collection.findOne({ _id: new ObjectId(id) });
    if (!post) {
        return undefined;
    }
    return mapPost(post);
};

export const createPost = async (data: Omit<Post, 'id' | 'createdAt' | '_id' | 'likes'>): Promise<Post> => {
    const collection = await getCollection();
    const newPost = {
        ...data,
        likes: 0,
        createdAt: new Date().toISOString(),
    };
    const result = await collection.insertOne(newPost);
    const insertedId = result.insertedId;

    const createdPost = {
      ...newPost,
      _id: insertedId,
      id: insertedId.toHexString()
    };
    return mapPost(createdPost);
};

export const updatePost = async (id: string, data: Partial<Omit<Post, 'id' | 'createdAt' | '_id'>>): Promise<Post | undefined> => {
    if (!ObjectId.isValid(id)) {
        return undefined;
    }
    const collection = await getCollection();
    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
    );
    if (!result) {
        return undefined;
    }
    return mapPost(result);
};

export const deletePost = async (id: string): Promise<void> => {
    if (!ObjectId.isValid(id)) {
        return;
    }
    const collection = await getCollection();
    await collection.deleteOne({ _id: new ObjectId(id) });
};

export const likePost = async (id: string): Promise<Post | undefined> => {
    if (!ObjectId.isValid(id)) {
        return undefined;
    }
    const collection = await getCollection();
    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $inc: { likes: 1 } },
        { returnDocument: 'after' }
    );
    if (!result) {
        return undefined;
    }
    return mapPost(result);
}
