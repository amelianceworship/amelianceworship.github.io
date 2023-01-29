import asm from 'asm-ts-scripts';

import s from './Avatar.module.scss';

interface Props {
	src?: string;
	alt?: string;
	char?: string;
	color?: string;
	size?: 'normal' | 'small';
	onClick?: () => void;
	icon?: string;
}

export function Avatar({
	src, alt, char, color, size = 'normal', onClick, icon,
}: Props) {
	const smallClass = size === 'small' && s.small;

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div className={onClick ? 'clickable' : ''} onClick={onClick}>
			{(!src && icon) && (
				<div
					className={asm.joinClasses(s.charContainer, smallClass)}
					style={{ backgroundColor: color }}
				>
					<span className={asm.joinClasses('icon', icon)} />
				</div>
			)}
			{src && <img className={asm.joinClasses(s.img, smallClass)} src={src} alt={alt} />}
			{!src && !icon
					&& (
						<div
							className={asm.joinClasses(s.charContainer, smallClass)}
							style={{ backgroundColor: color }}
						>
							<h5 className={asm.joinClasses(s.char, 'h5')}>
								{char}
							</h5>
						</div>
					)}
		</div>
	);
}
