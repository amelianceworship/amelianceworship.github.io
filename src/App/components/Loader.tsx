import { Backdrop } from './Backdrop';
import { Portal } from './Portal';

import './Loader.scss';

export function Loader() {
	return (
		<Portal>
			<div className="loader-container show">
				<Backdrop />
				<div className="loader">
					<div />
					<div />
					<div />
				</div>
			</div>
		</Portal>
	);
}
