'use client';

import { ReactNode } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { isServer, QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { AppStoreProvider } from '@/app/providers/store';

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				throwOnError: true
			}
		},
		queryCache: new QueryCache({
			onError: (error) => {
				// log requests errors
				console.error(error);
			}
		})
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (isServer) {
		return makeQueryClient();
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

export default function Index({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AntdRegistry>
				<AppStoreProvider>{children}</AppStoreProvider>
			</AntdRegistry>
		</QueryClientProvider>
	);
}
