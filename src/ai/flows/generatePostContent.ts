
'use server';
/**
 * @fileOverview A flow for generating blog post content using AI.
 *
 * - generatePostContent - A function that handles the post generation process.
 * - GeneratePostContentInput - The input type for the generatePostContent function.
 * - GeneratePostContentOutput - The return type for the generatePostContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GeneratePostContentInputSchema = z.object({
  topic: z.string().describe('The topic or subject for the blog post.'),
});
export type GeneratePostContentInput = z.infer<typeof GeneratePostContentInputSchema>;

const GeneratePostContentOutputSchema = z.object({
  title: z.string().describe('A compelling, SEO-friendly title for the blog post.'),
  description: z.string().describe('A short, engaging description or summary of the blog post (2-3 sentences).'),
  content: z.string().describe('The full content of the blog post in Markdown format. It should be well-structured with headings, paragraphs, and lists where appropriate.'),
});
export type GeneratePostContentOutput = z.infer<typeof GeneratePostContentOutputSchema>;

export async function generatePostContent(input: GeneratePostContentInput): Promise<GeneratePostContentOutput> {
    return generatePostContentFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generatePostContentPrompt',
    input: { schema: GeneratePostContentInputSchema },
    output: { schema: GeneratePostContentOutputSchema },
    prompt: `You are an expert content creator specializing in writing engaging and informative blog posts.

Your task is to generate a complete blog post based on the provided topic. The post should be well-written, structured, and ready to be published.

Please generate the following based on the topic:
1.  A compelling and SEO-friendly title.
2.  A short, engaging description (2-3 sentences) that can be used as a meta description or a post summary.
3.  The full content of the blog post, formatted in Markdown. Use headings, paragraphs, lists, and other Markdown elements to create a readable and well-structured article.

Topic: {{{topic}}}`,
});

const generatePostContentFlow = ai.defineFlow(
    {
        name: 'generatePostContentFlow',
        inputSchema: GeneratePostContentInputSchema,
        outputSchema: GeneratePostContentOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
