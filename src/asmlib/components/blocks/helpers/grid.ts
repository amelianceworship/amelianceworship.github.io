import asm from 'asm-ts-scripts';

type GridSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface Grid {
	size?: 12 | 10;
	xx?: GridSizes;
	xl?: GridSizes;
	lg?: GridSizes;
	md?: GridSizes;
	sm?: GridSizes;
	xs?: GridSizes;
	ss?: GridSizes;
}

export function getGridClass(grid: Grid) {
	const grinColumnSize = grid?.size === 10 ? 'col10' : 'col';

	const gridClass = asm.join([
		grid?.xx && `${grinColumnSize}-xx-${grid.xx}`,
		grid?.xl && `${grinColumnSize}-xl-${grid.xl}`,
		grid?.lg && `${grinColumnSize}-lg-${grid.lg}`,
		grid?.md && `${grinColumnSize}-md-${grid.md}`,
		grid?.sm && `${grinColumnSize}-sm-${grid.sm}`,
		grid?.xs && `${grinColumnSize}-xs-${grid.xs}`,
		grid?.ss && `${grinColumnSize}-ss-${grid.ss}`,
	]);

	// same as above
	// const columns = ['xx', 'xl', 'lg', 'md', 'sm', 'xs', 'ss'];
	// const gridClassTest = columns.reduce((result, s) => [
	// 	...result, grid?.[s as keyof Grid] && `${grinColumnSize}-${s}-${grid[s as keyof Grid]}`,
	// ], [] as (string | undefined)[]).filter((item) => typeof item === 'string' && item !== '').join(' ').trim();

	return gridClass;
}
