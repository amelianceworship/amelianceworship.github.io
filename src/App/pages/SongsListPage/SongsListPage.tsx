import { useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { ROUTES } from '~constants/ROUTES';
import { writeTextToClipboard } from '~helpers/writeTextToClipboard';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid';
import { CopyIcon } from '~/ameliance-ui/components/icons/CopyIcon';
import { Dropdown } from '~/ameliance-ui/components/Inputs/Dropdown';
import { Link } from '~/ameliance-ui/components/Link';
import { List, ListItem } from '~/ameliance-ui/components/List';
import { ToastList } from '~/ameliance-ui/components/Toast';
import { Typography } from '~/ameliance-ui/components/Typography';

import { ScrollUpButton } from './ScrollUpButton';

import s from './SongsListPage.module.scss';

export function SongsListPage() {
	const {
		isLoading, songsList, songsTableNames,
	} = useTypedSelector((state) => state.songsListReducer);

	const [activeTable, setActiveTable] = useState(songsTableNames[0]);

	const dispatch = useTypedDispatch();

	useEffect(() => {
		if (asm.isObjectEmpty(songsList)) {
			dispatch(fetchSongsList());
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleTableNameChange = (select: string) => {
		setActiveTable(select);
	};

	const [isShowToast, setIsShowToast] = useState(false);
	// const [toastTitle, setToastTitle] = useState('');
	// const [toastMessage, setToastMessage] = useState('');
	// const [toastType, setToastType] = useState<'alert' | 'info' | 'success' | 'error' | 'warn' | null>(null);
	const [toast, setToast] = useState<{
		title?: string;
		message: string;
		type?: 'alert' | 'info' | 'success' | 'error' | 'warn';
		id: string;
	}>({
		title: '',
		message: '',
		type: undefined,
		id: '',
	});

	const handleSongNameClick = async (event: React.MouseEvent<HTMLElement>) => {
		const text = event.currentTarget?.previousElementSibling?.textContent;

		if (text && typeof text === 'string') {
			const result = await writeTextToClipboard(text);
			if (result.status === 'success') {
				setToast((prev) => ({
					title: 'Скопійовано в буфер:',
					message: `${text}`,
					id: (+prev.id + 1).toString(),
				}));
			} else {
				setToast((prev) => ({
					title: '',
					message: 'Сталася невідома помилка! Напишіть, будь ласка, мені в телеграм=)',
					type: 'error',
					id: (+prev.id + 1).toString(),
				}));
			}
			setIsShowToast(true);
		}
	};

	const handleClearToastList = () => {
		setIsShowToast(false);
	};

	return (
		<Block component="main" className={s.SongsListPage}>
			<Grid component="section" container className={s.container}>
				{isShowToast && (
					<ToastList
						onClearList={handleClearToastList}
						title={toast.title}
						message={toast.message}
						type={toast.type}
						id={toast.id}
						size="flex"
						autoDeleteTime={3000}
						maxCount={3}
						position="top-right"
					/>
				)}
				{isLoading && <LoaderOverlay />}
				{ songsTableNames && (
					<Dropdown
						selected={songsTableNames[0]}
						onDropdownChange={handleTableNameChange}
						options={songsTableNames}
					/>
				)}
				{ songsList[activeTable] &&	(
					<Block component="nav" className={s.listNavigation}>
						{songsList[activeTable]?.map((songGroup) => (
							<Link href={`${ROUTES.songslist}#${songGroup[0]}`} className="link" key={songGroup[0]}>{songGroup[0]}</Link>
						))}
					</Block>
				)}
				{ songsList[activeTable] && (
					<Block className={s.songsList}>
						{songsList[activeTable]?.map((songGroup) => (
							<Block className={s.songsGroup} key={songGroup[0]}>
								<Typography component="h3" className={asm.join(s.songsGroupSymbol)} id={songGroup[0]}>{songGroup[0]}</Typography>
								<List className={s.songs}>
									{songGroup[1].map((songName) => (
										// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
										<ListItem
											className={s.songItem}
											key={songName.position}
										>
											<Typography
												component="p1"
												id={`song_${songName.position}`}
											>
												{songName.value}
											</Typography>
											<Button size="custom" type="text" className={s.copyIcon} onClick={handleSongNameClick}>
												<CopyIcon size="small" />
											</Button>
										</ListItem>
									))}
								</List>
							</Block>
						))}
					</Block>
				)}
				<ScrollUpButton />
			</Grid>
		</Block>
	);
}