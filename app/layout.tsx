import { Footer, NavBar } from '@/components';
import Head from 'next/head';
import './globals.css';
import type { Metadata } from 'next';
import React, { type ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'MovieHub',
	description: 'Find your favorite movies!',
};

interface RootLayoutProps {
	children: ReactNode;
	pageTitle?: string;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en">
			<body className="relative">
				<NavBar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
