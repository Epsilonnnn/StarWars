import { Grid, Breakpoint } from 'antd';
import { useMemo } from 'react';

const { useBreakpoint: useBreakpointAnt } = Grid;

const screenWeight = {
	xs: 1,
	sm: 2,
	md: 3,
	lg: 4,
	xl: 5,
	xxl: 6
};

export function useBreakpoint() {
	const screens = useBreakpointAnt();

	const currentBreakpoints = useMemo(() => {
		return (Object.entries(screens) as Array<[Breakpoint, boolean]>)
			.filter((screen) => Boolean(screen[1]))
			.sort((a, b) => screenWeight[b[0]] - screenWeight[a[0]]);
	}, [screens]);

	return currentBreakpoints?.[0]?.[0];
}
