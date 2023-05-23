import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { useTypedSelector } from '~store/hooks/useTypedSelector';

import { ScrollUpButton } from './ScrollUpButton';

const variant: Variants = {
	enter: { y: -24 },
	animated: (offset: number) => ({
		y: offset ? offset * -1 : -24,
		transition: { duration: 0.8 },
	}),
};

const MotionScrollUpButton = motion(ScrollUpButton);

export function ScrollUpButtonWithOffset() {
	const { isPlayerShow } = useTypedSelector((state) => state.musicPlayerReducer);
	const { pageMode } = useTypedSelector((state) => state.songsListReducer);

	const playerOffset = isPlayerShow && 174;
	const defaultOffset = pageMode === 'selection' && 64;
	const offset = playerOffset || defaultOffset || null;

	return (
		<MotionScrollUpButton
			variants={variant}
			initial="enter"
			animate="animated"
			custom={!!offset && offset}
		/>
	);
}
