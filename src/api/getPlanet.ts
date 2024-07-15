import { Planet } from '@/api/types';

export async function getPlanet(id: string): Promise<Planet> {
	const data = await fetch(`https://swapi.dev/api/planets/${id}/`);
	return data.json();
}
