'use server';
import { GoogleGenAI } from '@google/genai';
import db from '@/utils/db';
import Query from '@/models/query';
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

let reply: string | undefined = '';
export async function runAi(text: string) {
	const response = await ai.models.generateContent({
		model: 'gemini-2.0-flash',
		contents: text,
	});
	// console.log('response', response.text);
	return response.text;
}

export async function saveQuery(
	template: object,
	email: string,
	query: string,
	content: string
) {
	try {
		await db();
		const newQuery = new Query({ template, email, query, content });
		await newQuery.save();
		return { ok: true };
	} catch (err) {
		return { ok: false };
	}
}
