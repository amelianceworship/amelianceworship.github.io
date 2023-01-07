import { TextInput } from '~components/inputs/TextInput';

import s from './Search.module.scss';

export function Search() {
	return (
		<div className={s.Search}>
			<TextInput placeholder="Search..." />
		</div>
	);
}
