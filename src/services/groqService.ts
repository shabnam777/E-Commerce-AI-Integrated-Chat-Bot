// src/services/groqService.ts
// Handles all Groq API communication

import { GROQ_SYSTEM_PROMPT } from '../constants/i18n';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const callGroq = async (
  messages: GroqMessage[],
  apiKey: string
): Promise<string> => {
  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        { role: 'system', content: GROQ_SYSTEM_PROMPT },
        ...messages,
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content as string;
};
