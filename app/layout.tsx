import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import TopNav from '@/components/nav/top-nav';
import { ThemeProvider } from '@/components/theme-provider';

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
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<header>
							<TopNav />
						</header>
						<main>{children}</main>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
