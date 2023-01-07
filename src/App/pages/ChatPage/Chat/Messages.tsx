import { Message } from './Message';
import s from './Messages.module.scss';

export function Messages() {
	return (
		<div className={s.Messages}>
			<Message
				userName="Ameliance SkyMusic"
				message="Привіт, на конфу йдеш?"
				src="https://avatars.githubusercontent.com/u/38717657?v=4"
				alt=""
				time="11:50"
				isUser
				color="red"
			/>
			<Message
				userName="Дмитро"
				message="Я нас на конференції покормлять?!"
				src="https://amelianceskymusic.github.io/engle/static/media/img--dima.9a74dd854bace816fc76.jpg"
				alt=""
				time="12:40"
				isUser={false}
				color="red"
			/>
			<Message
				userName="Ameliance SkyMusic"
				message="А тобі тіко пожерти😅"
				src="https://avatars.githubusercontent.com/u/38717657?v=4"
				alt=""
				time="12:41"
				isUser
				color="red"
			/>
			<Message
				userName="Дмитро"
				message="А поспати?!"
				src="https://amelianceskymusic.github.io/engle/static/media/img--dima.9a74dd854bace816fc76.jpg"
				alt=""
				time="12:40"
				isUser={false}
				color="red"
			/>
			<Message
				userName="Ameliance SkyMusic"
				message="От, Дмитро!😅"
				src="https://avatars.githubusercontent.com/u/38717657?v=4"
				alt=""
				time="12:41"
				isUser
				color="red"
			/>
			<Message
				userName="Дмитро"
				message="Я не дмитро!"
				src="https://amelianceskymusic.github.io/engle/static/media/img--dima.9a74dd854bace816fc76.jpg"
				alt=""
				time="12:43"
				isUser={false}
				color="red"
			/>
			<Message
				userName="Ameliance SkyMusic"
				message="А хто?!🤔"
				src="https://avatars.githubusercontent.com/u/38717657?v=4"
				alt=""
				time="12:45"
				isUser
				color="red"
			/>
			<Message
				userName="Дмитро"
				message="Я тепер /.pha4/[7!"
				src="https://amelianceskymusic.github.io/engle/static/media/img--dima.9a74dd854bace816fc76.jpg"
				alt=""
				time="12:46"
				isUser={false}
				color="red"
			/>
			<Message
				userName="Ameliance SkyMusic"
				message="Маладез!"
				src="https://avatars.githubusercontent.com/u/38717657?v=4"
				alt=""
				time="12:46"
				isUser
				color="red"
			/>
		</div>
	);
}
