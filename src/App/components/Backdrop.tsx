import asm from 'asm-ts-scripts';

import s from './Backdrop.module.scss';

interface IBackdropProps {
	onClick?: () => void;
	disabled?: boolean;
}

export function Backdrop({ onClick, disabled }: IBackdropProps) {
	return (
		<button
			type="button"
			className={asm.joinClasses(s.Backdrop, disabled && s.disabled)}
			onClick={onClick}
		>
			{}
		</button>
	);
}
