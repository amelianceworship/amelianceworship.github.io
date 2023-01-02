import { useEffect, useState } from 'react';

import { Dropdown } from '~components/inputs/Dropdown';
import { Loader } from '~components/Loader';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';

import './SongsList.scss';

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
		<main className="main songs-list-page">
			<section className="container">
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
						<div className="songs-list">
							{songsList[activeTable].map((songGroup) => (
								<div className="songs-list__group songs-group" key={songGroup[0]}>
									<h3 className="h3 songs-group__title">{songGroup[0]}</h3>
									<div className="songs">
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
