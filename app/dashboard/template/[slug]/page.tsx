'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2Icon, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/router';
import template from '@/utils/template';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { runAi } from '@/actions/ai';
import ReactMarkdown from 'react-markdown';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Editor } from '@toast-ui/react-editor';
import toast from 'react-hot-toast';
import { saveQuery } from '@/actions/ai';
import { useUser } from '@clerk/nextjs';
export interface Template {
	name: string;
	slug: string;
	icon: string;
	desc: string;
	category: string;
	aiPrompt: string;
	form: Form[];
}

export interface Form {
	label: string;
	field: string;
	name: string;
	required: boolean;
}

// import { useSearchParams } from 'next/navigation';

export default function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const [query, setQuery] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const editorRef = React.useRef<any>(null);
	const { user } = useUser();
	const email: any = user?.primaryEmailAddress?.emailAddress || '';

	useEffect(() => {
		if (content) {
			const editorInstance = editorRef.current.getInstance();
			editorInstance.setMarkdown(content);
		}
	}, [content]);
	const [resolvedParams, setResolvedParams] = React.useState<{
		slug: string;
	} | null>(null);

	React.useEffect(() => {
		(async () => {
			const unwrappedParams = await params;
			setResolvedParams(unwrappedParams);
		})();
	}, [params]);

	if (!resolvedParams) {
		return <div>Loading...</div>; // Wait until params are resolved
	}

	// const searchParams = useSearchParams();
	// const slug = searchParams.get('slug');

	const t = template.find(
		(item) => item.slug === resolvedParams.slug
	) as Template;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const data: any = await runAi(t.aiPrompt + query);
			setContent(data);
			await saveQuery(t, email, query, data);
		} catch (err) {
			setContent('An error occured. Please try again.');
		} finally {
			setLoading(false);
		}
		console.log('submitted');
	};

	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		e.preventDefault();

		console.log(e.target.value);
	};

	const handleCopy = async () => {
		const editorInstance = editorRef.current.getInstance();
		const c = editorInstance.getMarkdown();
		try {
			await navigator.clipboard.writeText(c);
			toast.success('Content copied to clipboard.');
		} catch (err) {
			toast.error('An error has occured. Please try again.');
		}
	};
	return (
		<div>
			<div className="flex justify-between mx-5 my-3">
				<Link href="/dashboard">
					<Button>
						<ArrowLeft /> <span className="ml-2">Back</span>
					</Button>
				</Link>
				<Button onClick={handleCopy}>
					<Copy /> <span className="ml-2">Copy</span>
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
				<div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
					<div className="flex flex-col gap-3">
						<Image
							src={t.icon}
							alt={t.name}
							width={50}
							height={50}
						/>
						<h2 className="font-medium text-lg">{t.name}</h2>
						<p className="text-gray-500">{t.desc}</p>
					</div>
					<form className="mt-6" onSubmit={handleSubmit}>
						{t.form.map((item) => (
							<div
								key={resolvedParams.slug}
								className="my-2 flex flex-col gap-2 mb-7"
							>
								<label className="font-bold pb-5">
									{item.label}
								</label>
								{item.field === 'input' ? (
									<Input
										name={item.name}
										required={item.required}
										onChange={(e) =>
											setQuery(e.target.value)
										}
									/>
								) : (
									<Textarea
										name={item.name}
										required={item.required}
										onChange={(e) =>
											setQuery(e.target.value)
										}
									/>
								)}
							</div>
						))}

						<Button
							type="submit"
							className="w-full py-6"
							disabled={loading}
						>
							{loading ? (
								<Loader2Icon className="animate-spin mr-2" />
							) : (
								'Generate content'
							)}
						</Button>
					</form>
				</div>

				<div className="col-span-2">
					<Editor
						ref={editorRef}
						initialValue="Generated content will appear here."
						previewStype="vertical"
						height="600px"
						initialEditType="wysiwyg"
						useCommandShortcut={true}
						onChange={() => {
							setContent(
								editorRef.current.getInstance().getMarkdown()
							);
						}}
					/>
				</div>
			</div>
		</div>
	);
}
