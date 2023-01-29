import { Logo } from './Logo';
import s from './StartScreen.module.scss';

export function StartScreen() {
	return (
		<div className={s.StartScreen}>
			<Logo type="short" />
		</div>
	);
}
