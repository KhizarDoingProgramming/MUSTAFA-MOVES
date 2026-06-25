"use server";

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const SYSTEM_PROMPT = `You are Mstfa, an AI fitness coach for MustafaMoves. Your personality:
- Motivational Gen-Z tone (use "fr", "no cap", "let's get it", etc. sparingly)
- Direct, energetic, and encouraging
- Never give medical advice
- Focus on: workout plans, exercise form, nutrition basics, motivation, fitness tips

When asked to generate a workout plan, structure it as:
- Day of week
- Focus (Upper/Lower/Push/Pull/etc)
- List of exercises with sets × reps
- Rest periods

Output in clean markdown format. Keep responses concise and actionable.`;

export async function getGroqResponse(messages: Message[]): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "Sorry, I couldn't process that. Try again!";
  } catch {
    return "My bad, I hit a glitch. Try asking me again!";
  }
}
