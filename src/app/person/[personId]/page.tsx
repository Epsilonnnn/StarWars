import { cache } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getPerson } from '@/api/getPerson';
import Person from './person';

const getPersonWithClient = cache(async (personId: string) => {
	const queryClient = new QueryClient();

	const data = await queryClient.fetchQuery({
		queryKey: ['person', personId],
		queryFn: () => getPerson(personId)
	});

	return {
		client: queryClient,
		data
	};
});

type Props = {
	params: {
		personId: string;
	};
};

export async function generateMetadata({ params }: Props) {
	const { data } = await getPersonWithClient(params.personId);
	return {
		title: data.name
	};
}

export default async function PersonPage({ params: { personId } }: Props) {
	const { client } = await getPersonWithClient(personId);

	return (
		<HydrationBoundary state={dehydrate(client)}>
			<Person id={personId} />
		</HydrationBoundary>
	);
}
