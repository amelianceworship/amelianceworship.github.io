import { forwardRef, useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Icon } from '~components/Icon';
import { LoaderCounter } from '~components/LoaderCounter';

import s from './Toast.module.scss';

type ElementType = HTMLDivElement;
type ElementProps = React.DetailedHTMLProps<React.HTMLAttributes<ElementType>, ElementType>;

interface Toast extends ElementProps {
	id: string;
	message: string;
	title?: string;
	noTitle?: boolean;
	type?: 'alert' | 'info' | 'success' | 'error' | 'warn';
	size?: 'flex' | 'medium' | 'large';
	position?: 'bottom-center' | 'top-center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	oneLine?: boolean;
	onCloseButtonClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
	autoDeleteTime?: number;
}

export const Toast = forwardRef<HTMLDivElement, Toast>(({
	id,
	message,
	title,
	noTitle,
	type,
	size = 'flex',
	position = 'bottom-center',
	oneLine,
	onCloseButtonClick,
	autoDeleteTime = 0,
	className,
	...rest
}: Toast, ref) => {
	const [isShow, setIsShow] = useState(false);

	const sizeClass = (size === 'medium' && s.medium) || (size === 'large' && s.large);

	const typeClass = null
	|| (type === 'alert' && s.alert)
	|| (type === 'info' && s.info)
	|| (type === 'success' && s.success)
	|| (type === 'error' && s.error)
	|| (type === 'warn' && s.warn);

	const toastTitle = title
	|| ((type === 'alert' && 'Повідомлення!')
	|| (type === 'info' && 'Інформація!')
	|| (type === 'success' && 'Успіх!')
	|| (type === 'error' && 'Помилка')
	|| (type === 'warn' && 'Попередження!'));

	const typeIcon = (type === 'alert' && 'icon--alert-circle')
	|| (type === 'info' && 'icon--info')
	|| (type === 'success' && 'icon--check-circle')
	|| (type === 'error' && 'icon--x-circle')
	|| (type === 'warn' && 'icon--alert-triangle')
	|| 'icon--alert-circle';

	const toastPositionClass = (position === 'bottom-center' && s.bottomCenter)
	|| (position === 'top-center' && s.topCenter)
	|| (position === 'top-left' && s.topLeft)
	|| (position === 'top-right' && s.topRight)
	|| (position === 'bottom-left' && s.bottomLeft)
	|| (position === 'bottom-right' && s.bottomRight);

	useEffect(() => {
		setIsShow(true);
	}, [toastPositionClass]);

	return (
		<div
			className={asm.joinClasses(
				s.Toast,
				isShow && toastPositionClass,
				sizeClass,
				typeClass,
				className,
			)}
			ref={ref}
			{...rest}
			data-id={id}
		>
			<div className={s.content}>
				<Icon icon={typeIcon} />
				<div className={asm.joinClasses(s.textContent, oneLine && s.oneLine)}>
					<h6 className={asm.joinClasses(s.title, 'h6')}>
						{!noTitle && toastTitle}
					</h6>
					<span className={asm.joinClasses(s.message, 'p1')}>
						{message}
					</span>
				</div>
				<LoaderCounter timer={autoDeleteTime} />
			</div>
			<Icon size="small" icon="icon--x" onClick={onCloseButtonClick} />
		</div>
	);
});

Toast.displayName = 'Toast';
