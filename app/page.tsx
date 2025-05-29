'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { runAi } from '@/actions/ai';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

export default function Home() {
	const [response, setResponse] = useState('');
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');

	const handleClick = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		try {
			const data: string | undefined = await runAi(query);
			setResponse(data || 'No response received.');
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};
	// console.log(response);
	return (
		<>
			<form className="m-25" onSubmit={handleClick}>
				<Input
					className="ring-1 mb-5"
					placeholder="Ask anything"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button type="submit" id="run_ai_button">
					Generate with AI
				</Button>
			</form>
			<Card className="m-5">
				<CardHeader>AI response will appear here..</CardHeader>
				<CardContent>
					{loading ? (
						<div>'Loading...'</div>
					) : (
						<ReactMarkdown>{response}</ReactMarkdown>
					)}
				</CardContent>
			</Card>
		</>
	);
}
