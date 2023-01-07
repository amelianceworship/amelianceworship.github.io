import { Icon } from '~components/Icon';

import s from './Info.module.scss';

export function Info() {
	return (
		<div className={s.Info}>
			<h5 className="h5">
				Дмитро
			</h5>
			<Icon icon="icon--more-vertical" isClickable />
		</div>
	);
}
