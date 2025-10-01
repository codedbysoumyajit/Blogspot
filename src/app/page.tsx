import { getPaginatedPosts } from '@/lib/posts';
import type { Post } from '@/lib/definitions';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default async function Home({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const { posts, totalPages } = await getPaginatedPosts({ page: currentPage, limit: 5 });

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
          Welcome to Soumyajit's Blogspot
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Thoughts, stories, and ideas from my developer journey.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Post) => (
          <Link href={`/posts/${post.id}`} key={post.id} className="group block">
            <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2 border-transparent hover:border-primary">
              <CardHeader className="p-0">
                <div className="relative h-56 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    data-ai-hint="programming technology"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-bold font-headline group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="mt-3 text-muted-foreground line-clamp-3">
                  {post.description}
                </CardDescription>
                <p className="mt-4 text-sm font-semibold text-primary group-hover:underline">
                  Read more &rarr;
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center mt-12">
        <Button asChild variant="outline" disabled={!hasPreviousPage}>
          <Link href={hasPreviousPage ? `/?page=${currentPage - 1}` : '#'}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Link>
        </Button>
        <span className="text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button asChild variant="outline" disabled={!hasNextPage}>
          <Link href={hasNextPage ? `/?page=${currentPage + 1}` : '#'}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
