import { getPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getPosts();
    if (posts.length === 0) {
      return NextResponse.json({ message: 'No posts found' }, { status: 404 });
    }
    
    const latestPosts = posts.slice(0, 3);
    
    return NextResponse.json(latestPosts);
  } catch (error) {
    console.error('Failed to get latest posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
