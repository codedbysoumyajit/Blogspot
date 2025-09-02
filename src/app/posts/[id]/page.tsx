import { getPostById } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

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
      
      <p className="text-lg text-muted-foreground mb-8">
        Published on {new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-12 shadow-lg">
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

      <div className="prose dark:prose-invert lg:prose-lg max-w-none mx-auto text-foreground/90">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
