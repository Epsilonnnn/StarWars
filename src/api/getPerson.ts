import { Person } from '@/api/types';

export async function getPerson(id: string): Promise<Person> {
	const data = await fetch(`https://swapi.dev/api/people/${id}/`);
	return data.json();
}
