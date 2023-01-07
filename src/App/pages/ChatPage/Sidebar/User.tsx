import asm from 'asm-ts-scripts';

import { Avatar } from './Avatar';
import s from './User.module.scss';

interface Props {
	src: string;
	alt: string;
	userName: string;
	message: string;
	color?: string;
	isSelected?: boolean;
}
export function User({
	src,
	alt,
	userName,
	message,
	color,
	isSelected,
}: Props) {
	const userClass = asm.joinClasses(s.User, isSelected && s.selected);
	return (
		<div className={userClass}>
			<Avatar src={src} alt={alt} char={userName[0]} color={color} />
			<div className={s.textContent}>
				<h5 className={asm.joinClasses(s.userName, 'h5')}>
					{userName}
				</h5>
				<p className={asm.joinClasses(s.messagePreview, 'p2')}>
					{message}
				</p>
			</div>
		</div>
	);
}
