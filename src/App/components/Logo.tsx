import { Link } from 'react-router-dom';

import asm from 'asm-ts-scripts';

import { useAuth } from '~hooks/useAuth';

import s from './Logo.module.scss';

interface Logo {
	type?: 'normal' | 'short';
}

export function Logo({ type }: Logo) {
	const { isAuth } = useAuth();
	return (
		<div>
			{type === 'short' && <Link className={asm.joinClasses(s.Logo, s.short, 'aw-logo-short')} to="/" />}
			{type === 'normal' && <Link className={asm.joinClasses(s.Logo, 'aw-logo')} to="/" />}
			{!type && !isAuth && <Link className={asm.joinClasses(s.Logo, s.short, 'aw-logo-short')} to="/" />}
			{!type && isAuth && <Link className={asm.joinClasses(s.Logo, 'aw-logo')} to="/" />}
		</div>
	);
}
