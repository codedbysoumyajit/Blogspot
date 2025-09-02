'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PostForm from '@/components/PostForm';
import { getPostById, updatePost } from '@/lib/posts';
import type { Post } from '@/lib/definitions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function EditPostLoading() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-5 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-20 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}

export default function EditPostPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const fetchedPost = await getPostById(id);
        if(fetchedPost){
          setPost(fetchedPost);
        }
      }
      setIsLoading(false);
    };
    
    fetchPost();
  }, [id]);

  const handleUpdate = async (data: Partial<Omit<Post, 'id' | 'createdAt' | '_id'>>) => {
    if (!id) return;
    await updatePost(id, data);
  };

  if (isLoading) {
    return <EditPostLoading />;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return <PostForm post={post} onSave={handleUpdate} formType="Edit" />;
}
