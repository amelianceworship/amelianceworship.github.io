import { useEffect, useState } from 'react';

import { getClientInfo } from '~app/utils/getClientInfo';
import { Dropdown } from '~components/inputs/Dropdown';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';

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
		<main className="main">
			<section className="container">
				{isLoading && <h1 className="h1">loading...</h1>}
				{songsList[activeTable] && songsList[activeTable].length > 0
					&& (
						<Dropdown
							selected={songsTableNames[0]}
							onChange={handleTableNameChange}
							options={songsTableNames}
						/>
					)}
				{ songsList[activeTable] && songsList[activeTable].length > 0
					&& songsList[activeTable].map((songName) => <p className="p1" key={songName}>{songName}</p>)}
			</section>
		</main>
	);
}
