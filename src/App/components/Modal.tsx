import { useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Backdrop } from './Backdrop';
import { Portal } from './Portal';

import './Modal.scss';

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

	const modalClass = asm.joinClasses('modal', className, show);

	return (
		<Portal>
			<div className={modalClass} onAnimationEnd={handleAnimationend}>
				<Backdrop onClick={backdropClickHandler} />
				<div className="modal__content">{children}</div>
			</div>
		</Portal>
	);
}
