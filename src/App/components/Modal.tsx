import { useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Backdrop } from './Backdrop';
import s from './Modal.module.scss';
import { Portal } from './Portal';

interface IModalProps {
	children: React.ReactElement;
	className?: string;
	onClose: () => void;
}

export function Modal({ children, className, onClose }: IModalProps) {
	const [show, setShow] = useState('show');

	const backdropClickHandler = () => {
		setShow('');
	};

	const handleAnimationend = () => {
		if (show !== 'show') {
			onClose();
			document.body.style.overflow = 'visible';
		}
	};

	useEffect(() => {
		document.body.style.overflow = 'hidden';
	}, []);

	return (
		<Portal>
			<div
				className={asm.joinClasses(s.Modal, className, show)}
				onAnimationEnd={handleAnimationend}
			>
				<Backdrop onClick={backdropClickHandler} />
				<div className={s.content}>{children}</div>
			</div>
		</Portal>
	);
}
