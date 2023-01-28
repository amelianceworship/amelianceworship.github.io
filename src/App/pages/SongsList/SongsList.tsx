import { useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Icon } from '~components/Icon';
import { Dropdown } from '~components/inputs/Dropdown';
import { LoaderOverlay } from '~components/LoaderOverlay';
import { ToastList } from '~components/ToastList/ToastList';
import { ROUTES } from '~constants/ROUTES';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';

import { ScrollUpButton } from './ScrollUpButton';
import s from './SongsList.module.scss';

export function SongsList() {
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

		if (text) {
			try {
				await navigator.clipboard.writeText(text);
				setToast((prev) => ({
					title: 'Скопійовано в буфер:',
					message: `${text}`,
					id: (+prev.id + 1).toString(),
				}));
				setIsShowToast(true);
			} catch (error) {
				setToast((prev) => ({
					title: '',
					message: 'Сталася невідома помилка! Напишіть, будь ласка, мені в телеграм=)',
					type: 'error',
					id: (+prev.id + 1).toString(),
				}));
				setIsShowToast(true);
			}
		}
	};

	const handleClearToastList = () => {
		setIsShowToast(false);
	};

	return (
		<main className={asm.joinClasses(s.SongsList, 'main', 'songsList')}>
			<section className={asm.joinClasses(s.container, 'container')}>
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
						onChange={handleTableNameChange}
						options={songsTableNames}
					/>
				)}
				{ songsList[activeTable] &&	(
					<nav className={s.listNavigation}>
						{songsList[activeTable]?.map((songGroup) => (
							<a href={`${ROUTES.SONGS_LIST}#${songGroup[0]}`} className="link" key={songGroup[0]}>{songGroup[0]}</a>
						))}
					</nav>
				)}
				{ songsList[activeTable] && (
					<div className={s.songsList}>
						{songsList[activeTable]?.map((songGroup) => (
							<div className={s.songsGroup} key={songGroup[0]}>
								<h3 className={asm.joinClasses(s.songsGroupSymbol, 'h3')} id={songGroup[0]}>{songGroup[0]}</h3>
								<ul className={s.songs}>
									{songGroup[1].map((songName) => (
										// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
										<li
											className={s.songItem}
											key={songName.position}
										>
											<p
												className="p1"
												id={`song_${songName.position}`}
											>
												{songName.value}
											</p>
											<Icon className={s.copyIcon} onClick={handleSongNameClick} icon="icon--copy" />
										</li>

									))}
								</ul>
							</div>
						))}
					</div>
				)}
				<ScrollUpButton />
			</section>
		</main>
	);
}
