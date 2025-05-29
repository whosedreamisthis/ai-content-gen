'use client';
import { useState } from 'react';

import Image from 'next/image';
import { runAi } from '@/actions/ai';
export default function Home() {
	const [response, setResponse] = useState('');
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);
		try {
			const data: string | undefined = await runAi(
				'write a short zen tale'
			);
			setResponse(data);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<button onClick={handleClick}>Run AI</button>
			<hr />
			<div>{loading ? 'Loading...' : response}</div>
		</>
	);
}
