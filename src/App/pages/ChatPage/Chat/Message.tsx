import asm from 'asm-ts-scripts';

import { Avatar } from '../Sidebar/Avatar';
import s from './Message.module.scss';

interface Props {
	src: string;
	alt: string;
	userName: string;
	message: string;
	time: string;
	isUser: boolean;
	color: string;
}
export function Message({
	src,
	alt,
	userName,
	message,
	time,
	isUser,
	color,
}: Props) {
	const firstLetter = userName[0];
	const messageClass = asm.joinClasses(s.Message, isUser ? s.user : '');
	return (
		<div className={messageClass}>
			<Avatar src={src} alt={alt} char={firstLetter} color={color} />
			<div className={s.bubble}>
				<h5 className="h6">
					{userName}
				</h5>
				<p className="p2">
					{message}
				</p>
				<p className={asm.joinClasses(s.time, 'caption')}>
					{time}
				</p>
			</div>
		</div>
	);
}
