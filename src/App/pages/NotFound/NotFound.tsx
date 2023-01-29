import asm from 'asm-ts-scripts';

import s from './NotFound.module.scss';

export function NotFound() {
	return (
		<main className="main">
			<section className={asm.joinClasses(s.container, 'container')}>
				<div className={s.title}>
					<h1 className={asm.joinClasses(s.title40, 'h1')}>40</h1>
					<h1 className={asm.joinClasses(s.title4, 'h1')}>4</h1>
				</div>
			</section>
		</main>
	);
}
