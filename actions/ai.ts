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
export async function getQueries(email: string, page: number, perPage: number) {
	try {
		const skip = (page - 1) * perPage;
		const limit = perPage;

		const totalDocuments = await Query.countDocuments({ email });
		const totalPages = Math.ceil(totalDocuments / perPage);

		// Fetch queries and convert them to plain JavaScript objects
		const rawQueries = await Query.find({ email })
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 }) // Example: sort by creation date
			.lean() // This is the key! It returns plain JavaScript objects
			.exec();

		// If you need to manipulate the data further before sending to client, do it here
		// For example, if you want to remove sensitive fields or reformat dates
		const queries = rawQueries.map((query) => ({
			_id: query._id.toString(), // Convert ObjectId to string
			// ... other fields you want to send to the client
			prompt: query.prompt,
			response: query.response,
			createdAt: query.createdAt.toISOString(), // Convert Date to ISO string
			// Add any other fields from your query schema
		}));

		return {
			queries,
			totalPages,
		};
	} catch (error) {
		console.error('Error fetching queries:', error);
		// It's good practice to throw a more specific error or handle it gracefully
		throw new Error('Failed to fetch queries.');
	}
}
