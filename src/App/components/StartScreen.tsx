import { Block } from '~/ameliance-ui/components/blocks/Block';

import { Logo } from './Logo';

import s from './StartScreen.module.scss';

export function StartScreen() {
	return (
		<Block className={s.StartScreen}>
			<Logo type="short" />
		</Block>
	);
}
