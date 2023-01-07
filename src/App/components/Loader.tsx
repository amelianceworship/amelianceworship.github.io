import asm from 'asm-ts-scripts';

import { Backdrop } from './Backdrop';
import s from './Loader.module.scss';
import { Portal } from './Portal';

export function Loader() {
	return (
		<Portal>
			<div className={asm.joinClasses(s.Loader, 'show')}>
				<Backdrop />
				<div className={s.loaderElements}>
					<div />
					<div />
					<div />
				</div>
			</div>
		</Portal>
	);
}
