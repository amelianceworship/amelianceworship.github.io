import {
	useEffect, useLayoutEffect, useRef, useState,
} from 'react';

import asm from 'asm-ts-scripts';

import { asmSetIntervalCounts } from '~helpers/asmSetIntervalCounts';

import s from './LoaderCounter.module.scss';

interface LoaderCounter {
	timer: number;
	isInverted?: boolean;
}

export function LoaderCounter({ timer, isInverted }: LoaderCounter) {
	const [counter, setCounter] = useState(timer / 1000);

	useEffect(() => {
		asmSetIntervalCounts({
			callback: () => setCounter((prev) => prev - 1),
			delay: 1000,
			counts: timer / 1000,
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const refAnimation = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		refAnimation.current?.style.setProperty('--loader-counter--animation-duration', `${timer}ms`);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timer]);

	return (
		<div className={asm.joinClasses(s.LoaderCounter, isInverted ? s.inverted : s.normal)}>
			<div className={s.background} />
			<div className={s.animation} ref={refAnimation} />
			<p className={asm.joinClasses(s.counter, 'p2')}>
				{counter}
			</p>
		</div>
	);
}
