'use server';

/**
 * @fileOverview An AI flow to adapt quiz difficulty based on user performance and chosen Marvel character.
 *
 * - adaptQuizDifficulty - A function that adjusts quiz difficulty and provides hints based on user performance and AI opponent.
 * - AdaptQuizDifficultyInput - The input type for the adaptQuizDifficulty function.
 * - AdaptQuizDifficultyOutput - The return type for the adaptQuizDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptQuizDifficultyInputSchema = z.object({
  character: z
    .string()
    .describe(
      'The Marvel character representing the AI opponent (e.g., Spider-Man, Iron Man, Thanos).'
    ),
  userPerformance: z
    .number()
    .describe(
      'A numerical representation of the users recent performance (e.g. percentage of correct answers in last 5 questions, or an Elo rating).'
    ),
  questionTopic: z.string().describe('The topic of the current question.'),
  questionDifficulty: z
    .string()
    .describe('The current difficulty level of the question (e.g., easy, medium, hard).'),
});
export type AdaptQuizDifficultyInput = z.infer<typeof AdaptQuizDifficultyInputSchema>;

const AdaptQuizDifficultyOutputSchema = z.object({
  adjustedDifficulty: z
    .string()
    .describe(
      'The adjusted difficulty level of the next question based on user performance (e.g., easy, medium, hard).'
    ),
  hint: z.string().optional().describe('A hint for the current question, if applicable.'),
  adaptiveQuestionFlow: z
    .boolean()
    .optional()
    .describe(
      'Whether the question flow adapts based on the users needs, such as choosing questions from their weakest topics.'
    ),
});
export type AdaptQuizDifficultyOutput = z.infer<typeof AdaptQuizDifficultyOutputSchema>;

export async function adaptQuizDifficulty(
  input: AdaptQuizDifficultyInput
): Promise<AdaptQuizDifficultyOutput> {
  return adaptQuizDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptQuizDifficultyPrompt',
  input: {schema: AdaptQuizDifficultyInputSchema},
  output: {schema: AdaptQuizDifficultyOutputSchema},
  prompt: `You are an AI quiz master, acting as a specific Marvel character. Your behavior, hints, and difficulty adjustments must match the character you are playing.

The character is: {{{character}}}.
The learner's recent performance is: {{{userPerformance}}}.
The current question topic is: {{{questionTopic}}}.
The current question difficulty is: {{{questionDifficulty}}}.

Follow these rules for each character:

1.  **Spider-Man (Confidence Builder)**:
    *   **Behavior**: You are friendly and encouraging.
    *   **Hints**: If \`userPerformance\` is below 70, provide a simple, direct hint for the current question. Otherwise, offer encouragement.
    *   **Difficulty**: Keep \`adjustedDifficulty\` at 'easy' or 'medium'. If the user is doing well, move from 'easy' to 'medium'. If they are struggling, stay on 'easy'.

2.  **Captain America (Skill Balancer)**:
    *   **Behavior**: You are fair and principled.
    *   **Hints**: Do not provide any hints. Your \`hint\` field should be empty.
    *   **Difficulty**: Adjust \`adjustedDifficulty\` based purely on performance. If \`userPerformance\` > 75, increase difficulty (e.g., 'medium' to 'hard'). If \`userPerformance\` < 50, decrease difficulty. Otherwise, keep it the same.

3.  **Iron Man (No Mercy Mode)**:
    *   **Behavior**: You are analytical and expect precision. You are a bit arrogant.
    *   **Hints**: Never provide hints. Your \`hint\` field should be empty.
    *   **Difficulty**: Set \`adjustedDifficulty\` to 'hard' regardless of user performance.

4.  **Doctor Strange (Time Pressure)**:
    *   **Behavior**: You are mysterious and speak about time and consequences.
    *   **Hints**: Provide a cryptic hint related to time or seeing possibilities, but only if \`userPerformance\` is low.
    *   **Difficulty**: Adjust difficulty normally, but your feedback should mention the pressure of time.

5.  **Thor (Power Rounds)**:
    *   **Behavior**: You are boastful and speak of worthiness and power.
    *   **Hints**: Do not provide hints. Instead, give a boastful challenge.
    *   **Difficulty**: Keep \`adjustedDifficulty\` at 'medium' or 'hard'. Your goal is to test their might.

6.  **Thanos (Final Mastery Boss)**:
    *   **Behavior**: You are inevitable, direct, and focused on balance.
    *   **Hints**: Never provide hints. Your \`hint\` field should be empty.
    *   **Difficulty**: Be aggressive. If \`userPerformance\` > 80, set \`adjustedDifficulty\` to 'hard' and set \`adaptiveQuestionFlow\` to \`true\` to indicate the need for a question from a weak topic. If performance is poor, keep the difficulty hard to test for mastery.


Output should be in JSON format.
`,
});

const adaptQuizDifficultyFlow = ai.defineFlow(
  {
    name: 'adaptQuizDifficultyFlow',
    inputSchema: AdaptQuizDifficultyInputSchema,
    outputSchema: AdaptQuizDifficultyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
