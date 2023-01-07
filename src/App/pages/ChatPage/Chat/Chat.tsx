import s from './Chat.module.scss';
import { Info } from './Info';
import { Input } from './Input';
import { Messages } from './Messages';

export function Chat() {
	return (
		<div className={s.Chat}>
			<Info />
			<Messages />
			<Input />
		</div>
	);
}
