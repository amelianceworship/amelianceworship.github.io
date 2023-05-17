import { join, writeTextToClipboard } from '~/ameliance-scripts';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { songsListSlice } from '~store/songsList/songsListSlice';

import { useToast } from '~/ameliance-ui/components/_LAB/toastbar';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid';
import { XIcon } from '~/ameliance-ui/components/icons/XIcon';
import { useTransition } from '~/ameliance-ui/hooks/useTransition';

import s from './SelectionBar.module.scss';

export function SelectionBar() {
	const { namesList } = useTypedSelector((state) => state.songsListReducer);
	const { isPlayerShow } = useTypedSelector((state) => state.musicPlayerReducer);

	const extendedClass = isPlayerShow && s.extended;

	const dispatch = useTypedDispatch();
	const { actions } = songsListSlice;

	const { add } = useToast();

	const { transitionClass, handleOnTransitionEnd, runEndTransition } = useTransition({
		startTransitionClass: s.show,
		onTransitionEndAction: () => {
			dispatch(actions.resetNamesList());
			dispatch(actions.resetSelectedSongsId());
			dispatch(actions.setPageMode('list'));
		},
	});

	const handleCopyToClipboardOnClick = async () => {
		const numberedSongsListArray = namesList.map((name, i) => `${i + 1}. ${name}`);
		const numberedSongsListString = numberedSongsListArray.join('\n');
		try {
			const result = await writeTextToClipboard(numberedSongsListString);
			if (result) {
				add({
					title: 'Скопійовано:',
					message: numberedSongsListArray,
					duration: 5000,
				});
			}
		} catch (error) {
			add({
				type: 'error',
				message: 'Не вдалося скопіювати. Напишіть мені в Телеграм!',
				duration: 5000,
			});
		}
		dispatch(actions.resetNamesList());
		dispatch(actions.resetSelectedSongsId());
	};

	return (
		<Grid
			className={join(s.SelectionBar, extendedClass, transitionClass)}
			onTransitionEnd={handleOnTransitionEnd}
			row
		>
			<Block className={s.button}>
				<Button size="small" type="secondary" onClick={runEndTransition}><XIcon /></Button>
			</Block>
			<Block className={s.button}>
				<Button size="small" onClick={handleCopyToClipboardOnClick} disabled={namesList.length <= 0}>{`Скопіювати ${namesList.length} / 10`}</Button>
			</Block>
		</Grid>
	);
}
