'use server';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

let reply: string | undefined = '';
export async function runAi(text: string) {
	const response = await ai.models.generateContent({
		model: 'gemini-2.0-flash',
		contents: text,
	});
	console.log('response', response.text);
	return response.text;
}
