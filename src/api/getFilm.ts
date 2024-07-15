import { Film } from '@/api/types';

export async function getFilm(id: string): Promise<Film> {
	const data = await fetch(`https://swapi.dev/api/films/${id}/`);
	return data.json();
}
