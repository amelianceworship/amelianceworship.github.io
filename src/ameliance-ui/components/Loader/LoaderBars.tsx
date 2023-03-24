import { forwardRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './LoaderBars.module.scss';

type ComponentElementType = HTMLDivElement;

export type LoaderBarsProps = ReactHTMLElementAttributes<ComponentElementType>;

export const LoaderBars = forwardRef<ComponentElementType, LoaderBarsProps>(({
	className,
	...rest
}, ref) => (
	<div
		className={asm.join(s.LoaderBars, className)}
		ref={ref}
		{...rest}
	>
		<div />
		<div />
		<div />
	</div>
));

LoaderBars.displayName = 'LoaderBars';
