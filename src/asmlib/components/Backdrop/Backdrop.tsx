import { forwardRef, useEffect, useRef } from 'react';

import asm from 'asm-ts-scripts';

import s from './Backdrop.module.scss';

type ComponentElementType = HTMLButtonElement;

interface Backdrop extends ReactHTMLElementAttributes<ComponentElementType> {
	opacity?: number;
	disabled?: boolean;
	show: boolean;
}

export const Backdrop = forwardRef<ComponentElementType, Backdrop>(({
	className,
	disabled,
	show,
	opacity,
	...rest
}: Backdrop, ref) => {
	const backdropRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (backdropRef && opacity) backdropRef.current?.style.setProperty('--backdrop-opacity', `${opacity}%`);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backdropRef]);

	const componentClass = [
		disabled && s.disabled,
		show && s.show,
	];

	return (
		<button
			type="button"
			className={asm.join(s.Backdrop, className, componentClass)}
			ref={{ ...backdropRef, ...ref }}
			{...rest}
		>
			{}
		</button>
	);
});

Backdrop.displayName = 'Backdrop';
