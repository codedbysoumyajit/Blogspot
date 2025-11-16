import { getPosts } from '@/lib/posts';
import { NextRequest, NextResponse } from 'next/server';
import type { Post } from '@/lib/definitions';

export async function GET(request: NextRequest) {
  try {
    const posts = await getPosts();
    if (posts.length === 0) {
      return NextResponse.json({ message: 'No posts found' }, { status: 404 });
    }
    
    const latestPosts = posts.slice(0, 3);
    
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host');
    const baseUrl = `${protocol}://${host}`;

    const postsWithUrl = latestPosts.map((post: Post) => ({
      ...post,
      url: `${baseUrl}/posts/${post.id}`,
    }));
    
    return NextResponse.json(postsWithUrl);
  } catch (error) {
    console.error('Failed to get latest posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
