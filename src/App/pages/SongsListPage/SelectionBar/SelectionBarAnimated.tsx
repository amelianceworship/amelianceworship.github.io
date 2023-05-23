import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { useTypedSelector } from '~store/hooks/useTypedSelector';

import { SelectionBar } from './SelectionBar';

const variants: Variants = {
	hidden: { y: '100%' },
	open: {
		y: 0,
		transition: {
			ease: 'easeOut',
			duration: 0.8,
		},
	},
	close: {
		y: '100%',
		transition: {
			ease: 'easeIn',
			duration: 0.8,
		},
	},
	transition: {
		type: 'tween',
	},
};

const MotionSelectionBar = motion(SelectionBar);

export function SelectionBarAnimated() {
	const { pageMode } = useTypedSelector((state) => state.songsListReducer);
	return (
		<AnimatePresence initial={false}>
			{pageMode === 'selection' && (
				<MotionSelectionBar
					variants={variants}
					initial="hidden"
					animate="open"
					exit="close"
				/>
			)}
		</AnimatePresence>
	);
}
