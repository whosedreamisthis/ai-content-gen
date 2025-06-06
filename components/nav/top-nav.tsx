'use client';
import React from 'react';
import { ModeToggle } from '../mode-toggle';
import {
	ClerkProvider,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
	useUser,
} from '@clerk/nextjs';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default function TopNav() {
	const { isSignedIn, user } = useUser();
	return (
		<nav className="flex justify-between items-center p-2 shadow">
			<Toaster />
			<Link href="/">AI</Link>
			<div className="flex items-center">
				{isSignedIn && (
					<Link href="/dashboard" className="mr-2">
						{` ${user.fullName}'s Dashboard`}
					</Link>
				)}
				<SignedOut>
					<SignInButton />
					<SignUpButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
				<div className="ml-2">
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
}
