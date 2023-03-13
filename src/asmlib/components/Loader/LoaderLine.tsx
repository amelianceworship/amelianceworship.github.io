import asm from 'asm-ts-scripts';

import s from './LoaderLine.module.scss';

interface LoaderLine {
	isInversion?: boolean;
}

export function LoaderLine({ isInversion }: LoaderLine) {
	return (
		<div className={asm.join(s.LoaderLine, isInversion ? s.inversion : s.normal)}>
			<div className={s.background} />
			<div className={s.animation} />
		</div>
	);
}
