import asm from 'asm-ts-scripts';

import { Backdrop } from './Backdrop';
import { LoaderLine } from './LoaderLine';
import s from './LoaderOverlay.module.scss';
import { Portal } from './Portal';

export function LoaderOverlay() {
	return (
		<Portal>
			<div className={asm.joinClasses(s.LoaderOverlay, 'show')}>
				<Backdrop />
				<LoaderLine />
			</div>
		</Portal>
	);
}
