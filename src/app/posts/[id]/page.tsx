'use client';

import { getPostById } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, User, MapPin, Sparkles, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';
import type { Post } from '@/lib/definitions';
import { summarizePost } from '@/ai/flows/summarizePost';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

function PostLoading() {
  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-10 w-40" />
      </div>
      
      <Skeleton className="h-12 w-3/4 mb-4" />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-5 w-32 mt-2 sm:mt-0 sm:ml-auto" />
      </div>

      <Skeleton className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-12 shadow-lg" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
      </div>
    </article>
  )
}

export default function PostPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getPostById(id)
        .then(fetchedPost => {
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            setError('Post not found.');
          }
        })
        .catch(() => setError('Failed to load post.'))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleSummarize = async () => {
    if (!post) return;
    setIsSummarizing(true);
    setSummary(null);
    try {
      const result = await summarizePost({ content: post.content });
      setSummary(result.summary);
    } catch (e) {
      console.error(e);
      setSummary('Sorry, I was unable to generate a summary for this post.');
    } finally {
      setIsSummarizing(false);
    }
  };

  if (isLoading) {
    return <PostLoading />;
  }

  if (error) {
    return (
        <div className="text-center py-10">
            <p className="text-destructive">{error}</p>
            <Button asChild variant="link">
                <Link href="/">Go back to the homepage</Link>
            </Button>
        </div>
    )
  }

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button asChild variant="ghost">
            <Link href="/" className="flex items-center text-primary hover:text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
            </Link>
        </Button>
      </div>
      
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-5xl mb-4 font-headline">
        {post.title}
      </h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{post.author}</span>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <MapPin className="h-4 w-4" />
          <span>{post.location}</span>
        </div>
        <p className="mt-2 sm:mt-0 sm:ml-auto">
          Published on {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 1024px"
          data-ai-hint="programming technology"
        />
      </div>
      
      <div className="mb-8 space-y-4">
        <Button onClick={handleSummarize} disabled={isSummarizing} variant="outline">
          {isSummarizing ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Summarize with AI</>
          )}
        </Button>

        {summary && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>AI Summary</AlertTitle>
            <AlertDescription>
              {summary}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="prose dark:prose-invert lg:prose-lg max-w-none mx-auto text-foreground/90">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
