import { User } from './User';
import s from './UserList.module.scss';

export function UserList() {
	return (
		<div className={s.UserList}>
			<User
				userName="Пані Наталя"
				message="Як назвати кицьку?!"
				src="https://avatars.githubusercontent.com/u/95941412?v=4"
				alt=""
			/>
			<User
				userName="Пані Ірина"
				message="Ти точно не дизайнер?🤔"
				src="https://avatars.githubusercontent.com/u/5834309?v=4"
				alt=""
			/>
			<User
				userName="Дмитро"
				message="Я не дмитро!"
				src="https://amelianceskymusic.github.io/engle/static/media/img--dima.9a74dd854bace816fc76.jpg"
				alt=""
				isSelected
			/>
			<User
				userName="Невідомий Дядько"
				message="Нумо хлопці косити бабло!"
				src=""
				alt=""
			/>
		</div>
	);
}
