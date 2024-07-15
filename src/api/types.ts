type Url = string;
type DateString = string;

export type Person = {
	birth_year: string;
	eye_color: string;
	films: Url[];
	gender: string;
	hair_color: string;
	height: string;
	homeworld: Url;
	mass: string;
	name: string;
	skin_color: string;
	created: DateString;
	edited: DateString;
	species: Url[];
	starships: Url[];
	url: Url;
	vehicles: Url[];
};

export type Planet = {
	climate: string;
	diameter: string;
	films: Url[];
	gravity: string;
	name: string;
	orbital_period: string;
	population: string;
	residents: Url[];
	rotation_period: string;
	surface_water: string;
	terrain: string;
	url: Url;
};

export type Film = {
	title: string;
	episode_id: string;
	opening_crawl: string;
	producer: string;
	director: string;
	release_date: DateString;
	characters: Url[];
	starships: Url[];
};

export type Starship = {
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	cost_in_credits: string;
	crew: string;
	hyperdrive_rating: string;
	length: string;
	manufacturer: string;
	max_atmosphering_speed: string;
	model: string;
	name: string;
	passengers: string;
	films: Url[];
	pilots: Url[];
	starship_class: string;
	url: Url;
};

export type GetPersonsResponse = {
	results: Person[];
	count: number;
	next?: string | null;
	previous?: string | null;
};
