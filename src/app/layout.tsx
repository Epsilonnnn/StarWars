import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import styles from './layout.module.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Star Wars App',
	description: 'Star Wars Characters'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<main className={styles.main}>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
