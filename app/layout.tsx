import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/nav/top-nav';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'AI Content Generation',
	description: 'Generat content using AI',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<header>
						<TopNav />
					</header>
					<main>{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
