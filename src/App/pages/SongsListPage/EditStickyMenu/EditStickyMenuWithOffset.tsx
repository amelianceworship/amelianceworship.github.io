import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { useTypedSelector } from '~store/hooks/useTypedSelector';

import { EditStickyMenu } from './EditStickyMenu';

const variant: Variants = {
	enter: { y: -24 },
	animated: (offset: number) => ({
		y: offset || -24,
		transition: { duration: 0.8 },
	}),
};

const MotionEditStickyMenu = motion(EditStickyMenu);

export function EditStickyMenuWithOffset() {
	const { isPlayerShow } = useTypedSelector((state) => state.musicPlayerReducer);
	const { pageMode } = useTypedSelector((state) => state.songsListReducer);

	const playerOffset = isPlayerShow && -174;
	const defaultOffset = pageMode === 'selection' && '100%';
	const offset = playerOffset || defaultOffset || null;

	return (
		<MotionEditStickyMenu
			variants={variant}
			initial="enter"
			animate="animated"
			custom={!!offset && offset}
		/>
	);
}
