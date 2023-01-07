import { useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { Dropdown } from '~components/inputs/Dropdown';
import { Loader } from '~components/Loader';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';

import s from './SongsList.module.scss';

export function SongsList() {
	const {
		error, isLoading, songsList, songsTableNames,
	} = useTypedSelector((state) => state.songsListReducer);

	const [activeTable, setActiveTable] = useState(songsTableNames[0]);

	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(fetchSongsList());
	}, [dispatch]);

	const handleTableNameChange = (select: string) => {
		setActiveTable(select);
	};

	return (
		<main className={asm.joinClasses(s.SongsList, 'main')}>
			<section className={asm.joinClasses(s.container, 'container')}>
				{isLoading && <Loader />}
				{songsList[activeTable] && songsList[activeTable].length > 0
					&& (
						<Dropdown
							selected={songsTableNames[0]}
							onChange={handleTableNameChange}
							options={songsTableNames}
						/>
					)}
				{ songsList[activeTable] && songsList[activeTable].length > 0
					&& (
						<div className={s.songsList}>
							{songsList[activeTable].map((songGroup) => (
								<div className={s.songsGroup} key={songGroup[0]}>
									<h3 className={asm.joinClasses(s.songsGroupSymbol, 'h3')}>{songGroup[0]}</h3>
									<div className={s.songs}>
										{songGroup[1].map((songName) => <p className="p1 songs__item" id={`song_${songName.position}`} key={songName.position}>{songName.value}</p>)}
									</div>
								</div>
							))}
						</div>
					)}
			</section>
		</main>
	);
}
