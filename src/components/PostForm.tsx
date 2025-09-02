'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import type { Post } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, Sparkles, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { generatePostContent, GeneratePostContentOutput } from '@/ai/flows/generatePostContent';


const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  author: z.string().min(1, { message: 'Author is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  image: z.string().url({ message: 'Please enter a valid URL.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
});

type PostFormProps = {
  post?: Post;
  onSave: (data: z.infer<typeof formSchema>) => Promise<void>;
  formType: 'Create' | 'Edit';
};

function AIGenerationDialog({ onGenerate, isGenerating }: { onGenerate: (topic: string) => void, isGenerating: boolean }) {
    const [topic, setTopic] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleGenerate = () => {
        if (topic) {
            onGenerate(topic);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate with AI
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Post Content</DialogTitle>
                    <DialogDescription>
                        Enter a topic, and AI will generate a title, description, and content for your post.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="topic" className="text-right">
                            Topic
                        </Label>
                        <Input
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="col-span-3"
                            placeholder="e.g. 'The future of web development'"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="button" onClick={handleGenerate} disabled={isGenerating || !topic}>
                        {isGenerating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            'Generate'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function PostForm({ post, onSave, formType }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    setRandomImage(`https://picsum.photos/1200/800?random=${Math.floor(Math.random() * 100)}`)
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || '',
      description: post?.description || '',
      author: post?.author || '',
      location: post?.location || '',
      image: post?.image || '',
      content: post?.content || '',
    },
  });

  // Set image value separately to deal with hydration
  useEffect(() => {
    if (formType === 'Create' && randomImage) {
      form.setValue('image', randomImage);
    }
    if (formType === 'Edit' && post?.image) {
      form.setValue('image', post.image);
    }
  }, [randomImage, post, formType, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await onSave(values);
      toast({
        title: `Post ${formType === 'Create' ? 'Created' : 'Updated'}`,
        description: `The post has been successfully ${formType === 'Create' ? 'created' : 'updated'}.`,
      });
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${formType.toLowerCase()} post. Please try again.`,
        variant: 'destructive',
      });
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleAIGenerate = async (topic: string) => {
    setIsGenerating(true);
    try {
        const result: GeneratePostContentOutput = await generatePostContent({ topic });
        form.setValue('title', result.title);
        form.setValue('description', result.description);
        form.setValue('content', result.content);
        toast({
            title: "Content Generated",
            description: "The AI has successfully generated the post content.",
        });
    } catch (error) {
        console.error("AI Generation Error: ", error);
        toast({
            title: 'AI Generation Failed',
            description: 'There was an error generating content. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsGenerating(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>{formType} Post</CardTitle>
                        <CardDescription>Fill in the details for your blog post. Click save when you're done.</CardDescription>
                    </div>
                    <AIGenerationDialog onGenerate={handleAIGenerate} isGenerating={isGenerating} />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input placeholder="Your Post Title" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="A brief summary of your post to display on the homepage." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                            <Input placeholder="Author's Name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input placeholder="City, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://picsum.photos/1200/800" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Content</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Write your full blog post here... You can use markdown for formatting." rows={15} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Post</>}
                </Button>
            </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
