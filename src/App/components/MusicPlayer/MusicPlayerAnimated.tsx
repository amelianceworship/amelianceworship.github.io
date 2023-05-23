import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { useTypedSelector } from '~store/hooks/useTypedSelector';

import { MusicPlayer } from './MusicPlayer';

const variants: Variants = {
	hidden: { y: '100%' },
	open: {
		y: 0,
		transition: {
			duration: 0.6,
		},
	},
	close: {
		y: '100%',
		transition: {
			duration: 0.6,
		},
	},
};

const MotionMusicPlayer = motion(MusicPlayer);

export function MusicPlayerAnimated() {
	const { isPlayerShow } = useTypedSelector((state) => state.musicPlayerReducer);
	return (
		<AnimatePresence initial={false}>
			{isPlayerShow && (
				<MotionMusicPlayer
					variants={variants}
					initial="hidden"
					animate="open"
					exit="close"
				/>
			)}
		</AnimatePresence>
	);
}
