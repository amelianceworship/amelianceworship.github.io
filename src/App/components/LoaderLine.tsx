import asm from 'asm-ts-scripts';

import s from './LoaderLine.module.scss';

interface LoaderLine {
	isInverted?: boolean;
}

export function LoaderLine({ isInverted }: LoaderLine) {
	return (
		<div className={asm.joinClasses(s.LoaderLine, isInverted ? s.inverted : s.normal)}>
			<div className={s.background} />
			<div className={s.animation} />
		</div>
	);
}
