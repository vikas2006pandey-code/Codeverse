
'use server';

import { getJarvisResponse as getJarvisResponseFlow, JarvisInput } from '@/ai/flows/jarvis-chat-flow';

export async function getJarvisResponse(input: JarvisInput) {
  try {
    const result = await getJarvisResponseFlow(input);
    return result;
  } catch (error) {
    console.error("AI Error:", error);
    return { response: "An error occurred. I am unable to assist at this moment." };
  }
}
