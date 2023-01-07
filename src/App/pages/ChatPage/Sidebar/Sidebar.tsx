import { Navbar } from './Navbar';
import { Search } from './Search';
import s from './Sidebar.module.scss';
import { UserList } from './UserList';

export function Sidebar() {
	return (
		<div className={s.Sidebar}>
			<Navbar />
			<UserList />
			<Search />
		</div>
	);
}
