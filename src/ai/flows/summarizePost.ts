
'use server';
/**
 * @fileOverview A flow for summarizing blog post content using AI.
 *
 * - summarizePost - A function that handles the post summarization process.
 * - SummarizePostInput - The input type for the summarizePost function.
 * - SummarizePostOutput - The return type for the summarizePost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SummarizePostInputSchema = z.object({
  content: z.string().describe('The content of the blog post to summarize.'),
});
export type SummarizePostInput = z.infer<typeof SummarizePostInputSchema>;

const SummarizePostOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the blog post content (3-5 sentences).'),
});
export type SummarizePostOutput = z.infer<typeof SummarizePostOutputSchema>;

export async function summarizePost(input: SummarizePostInput): Promise<SummarizePostOutput> {
    return summarizePostFlow(input);
}

const prompt = ai.definePrompt({
    name: 'summarizePostPrompt',
    input: { schema: SummarizePostInputSchema },
    output: { schema: SummarizePostOutputSchema },
    prompt: `You are an expert at summarizing technical articles. Your task is to create a concise summary of the following blog post content. The summary should be between 3 and 5 sentences and capture the main points of the article.

Content to summarize:
{{{content}}}`,
});

const summarizePostFlow = ai.defineFlow(
    {
        name: 'summarizePostFlow',
        inputSchema: SummarizePostInputSchema,
        outputSchema: SummarizePostOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
