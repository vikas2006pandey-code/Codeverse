'use server';

import { adaptQuizDifficulty } from '@/ai/flows/adaptive-ai-difficulty';

export async function getAIResponse(characterName: string, performance: number, topic: string, difficulty: string) {
  try {
    const result = await adaptQuizDifficulty({
      character: characterName,
      userPerformance: performance,
      questionTopic: topic,
      questionDifficulty: difficulty,
    });
    return result;
  } catch (error) {
    console.error("AI Error:", error);
    // Return a default structure on error to prevent client-side crashes
    return { adjustedDifficulty: difficulty, hint: undefined, adaptiveQuestionFlow: false };
  }
}
