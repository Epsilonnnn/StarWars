import { GetPersonsResponse } from '@/api/types';

export async function getPersons(page: number, search?: string): Promise<GetPersonsResponse> {
	const params = new URLSearchParams();

	if (page) {
		params.append('page', String(page));
	}

	if (search) {
		params.append('search', search);
	}

	const queryString = params.toString();
	const response = await fetch(
		`https://swapi.dev/api/people/${queryString ? '?' + queryString : ''}`
	);
	return response.json();
}
