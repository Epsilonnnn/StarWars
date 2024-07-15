import { Person } from '@/api/types';

export type AppState = {
	overridenPersonsData: Record<string, Person>;
	setPerson: (person: Person) => void;
};
