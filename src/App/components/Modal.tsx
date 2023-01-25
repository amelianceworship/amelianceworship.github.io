import { useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { useScrollLock } from '~hooks/useScrollLock';

import { Backdrop } from './Backdrop';
import { Button } from './inputs/Button';
import s from './Modal.module.scss';
import { Portal } from './Portal';

interface Button {
	text?: string;
	onClick?: () => void;
	icon?: string;
	iconPosition?: 'left' | 'right';
	isDisabled?: boolean;
	isButtonIcon?: boolean;
	size?: 'normal' | 'small';
	isSubmit?: boolean;
	type?: 'primary' | 'secondary';
	form?: string;
}

interface ModalProps {
	type?: 'alert' | 'info' | 'success' | 'error' | 'warn';
	heading?: string;
	children: React.ReactElement;
	className?: string;
	mainButton?: Button;
	secondButton?: Button;
	backdrop?: {
		onClick?: { (): void } | null;
		isDisabled?: boolean;
	};
	onClose?: () => void;
	isButtons?: boolean;
	size?: 'flex' | 'medium' | 'large';
}

export function Modal({
	type,
	heading,
	children,
	className,
	mainButton,
	secondButton,
	backdrop,
	onClose,
	isButtons = true,
	size = 'flex',
}: ModalProps) {
	const [show, setShow] = useState('show');

	const isSecondButton = secondButton && !asm.isObjectEmpty(secondButton);

	const closeModal = () => {
		setShow('');
	};

	const handleAnimationend = () => {
		if (show !== 'show') {
			closeModal();
			document.body.style.overflow = 'visible';
			if (onClose) onClose();
		}
	};

	const backdropClickHandler = () => {
		if (backdrop?.onClick) backdrop.onClick();
		closeModal();
	};

	const mainButtonHandler = () => {
		if (mainButton?.onClick) mainButton.onClick();
		if (!mainButton?.form) closeModal();
	};

	const secondButtonHandler = () => {
		if (secondButton?.onClick) secondButton.onClick();
		if (!secondButton?.form) closeModal();
	};

	useEffect(() => {
		document.body.style.overflow = 'hidden';
	}, []);

	const sizeClass = (size === 'medium' && s.medium) || (size === 'large' && s.large);

	return (
		<Portal>
			<div
				className={asm.joinClasses(s.Modal, className, show)}
				onAnimationEnd={handleAnimationend}
			>
				<Backdrop onClick={backdropClickHandler} disabled={backdrop?.isDisabled} />
				<div className={asm.joinClasses(sizeClass, s.content)}>
					{(heading || type) && (
						// <div className={type && asm.joinClasses(s.heading, type)}>
						<h4 className={asm.joinClasses(type && s.heading, type && type, 'h4')}>
							{!heading && type === 'alert' && 'СПОВІЩЕННЯ!'}
							{!heading && type === 'error' && 'ПОМИЛКА!'}
							{!heading && type === 'warn' && 'УВАГА!'}
							{!heading && type === 'info' && 'ІНФОРМАЦІЯ!'}
							{!heading && type === 'success' && 'УСПІХ!'}
							{heading && heading}
						</h4>
						// </div>
					)}
					<div className={s.body}>
						{children}
					</div>
					{isButtons && (
						<div className={s.buttons}>
							{isSecondButton && (
								<Button
									size={secondButton?.size}
									icon={secondButton?.icon}
									iconPosition={secondButton?.iconPosition}
									type={secondButton?.type || 'secondary'}
									onClick={() => secondButtonHandler()}
									isButtonIcon={secondButton?.isButtonIcon}
									form={secondButton?.form}
									isSubmit={secondButton?.isSubmit}
									disabled={secondButton?.isDisabled}
								>
									{secondButton?.text || 'Відміна'}
								</Button>
							)}
							<Button
								size={mainButton?.size}
								type={mainButton?.type || 'primary'}
								icon={mainButton?.icon}
								iconPosition={mainButton?.iconPosition}
								onClick={() => mainButtonHandler()}
								isButtonIcon={mainButton?.isButtonIcon}
								form={mainButton?.form}
								isSubmit={mainButton?.isSubmit}
								disabled={mainButton?.isDisabled}
							>
								{mainButton?.text || 'Ок'}
							</Button>
						</div>
					)}
				</div>
			</div>
		</Portal>
	);
}
