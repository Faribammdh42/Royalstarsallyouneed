// 'use server'; // Disabled for static export

/**
 * @fileOverview Determines appropriate restrictions for AI music generation based on user activity.
 *
 * - suggestUserRestrictions - A function that suggests user restrictions for AI music generation.
 * - SuggestUserRestrictionsInput - The input type for the suggestUserRestrictions function.
 * - SuggestUserRestrictionsOutput - The return type for the suggestUserRestrictions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestUserRestrictionsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  dailyMusicGenerations: z.number().describe('The number of music generations the user has made today.'),
  totalMusicGenerations: z.number().describe('The total number of music generations the user has ever made.'),
});
export type SuggestUserRestrictionsInput = z.infer<typeof SuggestUserRestrictionsInputSchema>;

const SuggestUserRestrictionsOutputSchema = z.object({
  generationLimit: z.number().describe('The maximum number of music generations allowed per day.'),
  premiumFeaturesAccess: z.boolean().describe('Whether the user should be offered access to premium features to increase limits.'),
  reason: z.string().describe('The reason for the suggested restrictions.'),
});
export type SuggestUserRestrictionsOutput = z.infer<typeof SuggestUserRestrictionsOutputSchema>;

export async function suggestUserRestrictions(input: SuggestUserRestrictionsInput): Promise<SuggestUserRestrictionsOutput> {
  return suggestUserRestrictionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestUserRestrictionsPrompt',
  input: {schema: SuggestUserRestrictionsInputSchema},
  output: {schema: SuggestUserRestrictionsOutputSchema},
  prompt: `Based on the user's activity, suggest appropriate restrictions for AI music generation.

User ID: {{{userId}}}
Daily Music Generations: {{{dailyMusicGenerations}}}
Total Music Generations: {{{totalMusicGenerations}}}

Consider the following:
- A fair daily limit for all users.
- Whether the user should be offered access to premium features to increase their limit.
- The reason for the suggested restrictions.
`,
});

const suggestUserRestrictionsFlow = ai.defineFlow(
  {
    name: 'suggestUserRestrictionsFlow',
    inputSchema: SuggestUserRestrictionsInputSchema,
    outputSchema: SuggestUserRestrictionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
