import {
	Context,
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState
} from 'react';
import { Person } from '@/api/types';
import { AppState } from '@/app/providers/types';
import { getPersonId } from '@/api/utils';

export const AppStoreContext: Context<AppState> = createContext({
	overridenPersonsData: {},
	setPerson: () => {}
} as AppState);

export function useAppStore() {
	return useContext(AppStoreContext);
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
	const [appState, setAppState] = useState<Omit<AppState, 'setPerson'>>({
		overridenPersonsData: {}
	});

	const setPerson = useCallback(
		(person: Person) => {
			const personId = getPersonId(person);
			if (!personId) {
				return;
			}

			setAppState({
				overridenPersonsData: {
					...appState.overridenPersonsData,
					[personId]: person
				}
			});
		},
		[appState.overridenPersonsData]
	);

	const store = useMemo(() => ({ ...appState, setPerson }), [appState, setPerson]);

	return <AppStoreContext.Provider value={store}>{children}</AppStoreContext.Provider>;
}
