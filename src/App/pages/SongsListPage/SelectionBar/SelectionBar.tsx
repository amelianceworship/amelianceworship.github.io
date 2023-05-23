import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { join, writeTextToClipboard } from '~/ameliance-scripts';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { songsListSlice } from '~store/songsList/songsListSlice';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid';
import { XIcon } from '~/ameliance-ui/components/icons/XIcon';
import { useSnack } from '~/ameliance-ui/components/snackbar';

import s from './SelectionBar.module.scss';

const MotionGrid = motion(Grid);

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

export function SelectionBar() {
	const { namesList } = useTypedSelector((state) => state.songsListReducer);
	const { isPlayerShow } = useTypedSelector((state) => state.musicPlayerReducer);

	const extendedClass = isPlayerShow && s.extended;

	const dispatch = useTypedDispatch();
	const { actions } = songsListSlice;

	const snack = useSnack();

	const handleCopyToClipboardOnClick = async () => {
		const numberedSongsListArray = namesList.map((name, i) => `${i + 1}. ${name}`);
		const numberedSongsListString = numberedSongsListArray.join('\n');
		try {
			const result = await writeTextToClipboard(numberedSongsListString);
			if (result) {
				snack.add({
					title: 'Скопійовано:',
					message: numberedSongsListArray,
					duration: 5000,
				});
			}
		} catch (error) {
			snack.add({
				type: 'error',
				message: 'Не вдалося скопіювати. Напишіть мені в Телеграм!',
				duration: 5000,
			});
		}
		dispatch(actions.resetNamesList());
		dispatch(actions.resetSelectedSongsId());
	};

	const handleCloseOnClick = () => {
		dispatch(actions.resetNamesList());
		dispatch(actions.resetSelectedSongsId());
		dispatch(actions.setPageMode('list'));
	};

	return (
		<MotionGrid
			className={join(s.SelectionBar, extendedClass)}
			variants={variants}
			initial="hidden"
			animate="open"
			exit="close"
			row
		>
			<Block className={s.button}>
				<Button size="small" type="secondary" onClick={handleCloseOnClick}><XIcon /></Button>
			</Block>
			<Block className={s.button}>
				<Button size="small" onClick={handleCopyToClipboardOnClick} disabled={namesList.length <= 0}>{`Скопіювати ${namesList.length} / 10`}</Button>
			</Block>
		</MotionGrid>
	);
}
