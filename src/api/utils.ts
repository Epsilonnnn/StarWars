import { Person } from '@/api/types';

export function getPersonId(person: Person) {
	const match = person.url.match(/https:\/\/swapi.dev\/api\/people\/(\d+)\//);

	if (!match?.[1]) {
		return null;
	}

	return match[1];
}

export function getPersonHomeworldId(person: Person) {
	const match = person.homeworld.match(/https:\/\/swapi.dev\/api\/planets\/(\d+)\//);

	if (!match?.[1]) {
		return null;
	}

	return match[1];
}

export function getPersonFilmsIds(person: Person) {
	return person.films.reduce((res, filmUrl) => {
		const match = filmUrl.match(/https:\/\/swapi.dev\/api\/films\/(\d+)\//);

		if (match?.[1]) {
			res.push(match[1]);
		}

		return res;
	}, [] as string[]);
}

export function getPersonStarshipsIds(person: Person): string[] {
	return person.starships.reduce((res, starshipUrl) => {
		const match = starshipUrl.match(/https:\/\/swapi.dev\/api\/starships\/(\d+)\//);

		if (match?.[1]) {
			res.push(match[1]);
		}

		return res;
	}, [] as string[]);
}
