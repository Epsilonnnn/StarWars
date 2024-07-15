'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from 'antd';

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log errors
		console.error(error);
	}, [error]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<h2>Something went wrong!</h2>
			<Button style={{ marginTop: '10px' }} type="primary" onClick={() => reset()}>
				Try again
			</Button>
		</div>
	);
}
