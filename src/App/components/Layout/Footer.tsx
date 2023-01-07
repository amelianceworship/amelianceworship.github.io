import asm from 'asm-ts-scripts';

import { useAuth } from '~hooks/useAuth';

import s from './Footer.module.scss';

export function Footer() {
	const { isAuth } = useAuth();

	if (!isAuth) return null;

	return (
		<footer className="footer">
			<section className={asm.joinClasses(s.container, 'container')}>
				<a href="/" target="_blank" className="link">
					2023 01 06
				</a>
			</section>
		</footer>
	);
}
