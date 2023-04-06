import { writeTextToClipboard } from '~helpers/writeTextToClipboard';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { songsListSlice } from '~store/songsList/songsListSlice';

import { useToast } from '~/ameliance-ui/components/_LAB/toastbar';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid';
import { ArrowLeftIcon } from '~/ameliance-ui/components/icons/ArrowLeftIcon';
import { CheckSquareIcon } from '~/ameliance-ui/components/icons/CheckSquareIcon';
import { XIcon } from '~/ameliance-ui/components/icons/XIcon';

import s from './Toolbar.module.scss';

export function Toolbar() {
	const { mode, namesList, selectedSongsId } = useTypedSelector((state) => state.songsListReducer);
	const dispatch = useTypedDispatch();
	const { actions } = songsListSlice;

	const { add } = useToast();

	const handleBackwardOnClick = () => {
		dispatch(actions.setMode('list'));
	};

	const handleResetOnClick = () => {
		dispatch(actions.resetNamesList());
		dispatch(actions.resetSelectedSongsId());
	};

	const handleSelectOnClick = () => {
		dispatch(actions.setMode('copy'));
	};

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
		<Grid className={s.Toolbar} container row>
			{mode === 'copy' ? (
				<>
					<Block className={s.button}>
						{selectedSongsId.length > 0
							? <Button type="secondary" onClick={handleResetOnClick}><XIcon /></Button>
							: <Button type="secondary" onClick={handleBackwardOnClick}><ArrowLeftIcon /></Button>}
					</Block>
					<Block className={s.button}>
						<Button onClick={handleCopyToClipboardOnClick} disabled={namesList.length <= 0}>{`Скопіювати ${namesList.length} / 10`}</Button>
					</Block>
				</>
			) : (
				<Block className={s.button}>
					{/* <Block className={s.button} onClick={handleSelectOnClick} grid={{ xx: 3 }}> */}
					<Button type="secondary" onClick={handleSelectOnClick}><CheckSquareIcon /></Button>
					{/* <Typography component="caption">Вибрати</Typography> */}
				</Block>
			)}
		</Grid>
	);
}
