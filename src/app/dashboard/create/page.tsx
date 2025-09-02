'use client';

import PostForm from '@/components/PostForm';
import { createPost } from '@/lib/posts';
import type { Post } from '@/lib/definitions';

export default function CreatePostPage() {
  const handleCreate = async (data: Omit<Post, 'id' | 'createdAt'>) => {
    await createPost(data);
  };

  return <PostForm onSave={handleCreate} formType="Create" />;
}
