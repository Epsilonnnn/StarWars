import { Starship } from '@/api/types';

export async function getStarship(id: string): Promise<Starship> {
	const data = await fetch(`https://swapi.dev/api/starships/${id}/`);
	return data.json();
}
