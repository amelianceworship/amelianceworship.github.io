import { useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Dropdown } from '~components/inputs/Dropdown';
import { LoaderOverlay } from '~components/LoaderOverlay';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';

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

	return (
		<main className={asm.joinClasses(s.SongsList, 'main', 'songsList')}>
			<section className={asm.joinClasses(s.container, 'container')}>
				{isLoading && <LoaderOverlay />}
				{ songsList[activeTable].length > 0
					&& (
						<Dropdown
							selected={songsTableNames[0]}
							onChange={handleTableNameChange}
							options={songsTableNames}
						/>
					)}
				{ songsList[activeTable] && songsList[activeTable].length > 0
				&&	(
					<nav className={s.listNavigation}>
						{songsList[activeTable].map((songGroup) => (
							<a href={`#${songGroup[0]}`} className="link" key={songGroup[0]}>{songGroup[0]}</a>
						))}
					</nav>
				)}
				{ songsList[activeTable] && songsList[activeTable].length > 0
				&& (
					<div className={s.songsList}>
						{songsList[activeTable].map((songGroup) => (
							<div className={s.songsGroup} key={songGroup[0]}>
								<h3 className={asm.joinClasses(s.songsGroupSymbol, 'h3')} id={songGroup[0]}>{songGroup[0]}</h3>
								<ul className={s.songs}>
									{songGroup[1].map((songName) => <li className="p1 songs__item" id={`song_${songName.position}`} key={songName.position}>{songName.value}</li>)}
								</ul>
							</div>
						))}
					</div>
				)}
			</section>
		</main>
	);
}
