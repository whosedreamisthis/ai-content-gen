'use client';
import React from 'react';
import {
	LayoutDashboard,
	FileClock,
	WalletCards,
	Settings,
	Divide,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
export default function SideNav() {
	const path = usePathname();

	const menu = [
		{
			name: 'Dashboard',
			icon: LayoutDashboard,
			path: '/dashboard',
		},
		{
			name: 'History',
			icon: FileClock,
			path: '/dashboard/history',
		},
		{
			name: 'Billing',
			icon: WalletCards,
			path: '/dashboard/billing',
		},
		{
			name: 'Settings',
			icon: Settings,
			path: '/dashboard/settings',
		},
	];

	console.log('path', path);
	return (
		<div className="h-screen p-3 shadow-sm border">
			{menu.map((item, index) => (
				// <div
				// 	key={index}
				// 	className={`${
				// 		path === item.path
				// 			? 'bg-primary text-white'
				// 			: 'hover:bg-primary text-white'
				// 	}
				// 	 flex m-2 mr-4 p-2 rounded-lg cursor-pointer`}
				// >
				<div
					key={index}
					className={`${
						path === item.path
							? 'bg-primary text-white'
							: 'hover:bg-primary hover:text-white'
					} flex m-2 mr-2 p-2 rounded-lg cursor-pointer`}
				>
					<Link href={item.path}>
						<div className="flex items-center justify-center md:justify-start">
							<item.icon className="w-6 h-6" />{' '}
							<span className="ml-2 hidden md:inline">
								{item.name}
							</span>
						</div>
					</Link>
				</div>
			))}
		</div>
	);
}

<LayoutDashboard />;
