import { useEffect, useState } from 'react';

import asm from 'asm-ts-scripts';

import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Dropdown } from '~/ameliance-ui/components/Inputs/Dropdown';

import { TABLE_NAMES } from './constants/TABLE_NAMES';
import { ListNavigation } from './ListNavigation/ListNavigation';
import { ScrollUpButton } from './ScrollUpButton';
import { SongsCopy } from './SongsCopy/SongsCopy';
import { SongsList } from './SongsList/SongsList';
import { Toolbar } from './Toolbar/Toolbar';

import s from './SongsListPage.module.scss';

export function SongsListPage() {
	const [activeTableNumber, setActiveTableNumber] = useState(0);
	const [charsListTable, setCharsListTable] = useState<string[][]>([]);

	const {
		error, isLoading, songsList, mode,
	} = useTypedSelector((state) => state.songsListReducer);

	const dispatch = useTypedDispatch();

	useEffect(() => {
		if (asm.isObjectEmpty(songsList)) {
			dispatch(fetchSongsList());
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (charsListTable.length === 0 && songsList.length > 0) {
			setCharsListTable(
				// *----- generate array of group char heading -----
				songsList
					.map((table) => table[1]
						.map((group) => group[0])),
			);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [songsList]);

	const handleTableNameChange = (select: string) => {
		const tableNumber = TABLE_NAMES.indexOf(select);
		setActiveTableNumber(tableNumber);
	};

	if (error) throw Error(error);

	return (
		<Block component="main" className={s.SongsListPage}>
			<Grid component="section" container className={s.container}>
				{isLoading && <LoaderOverlay />}
				<Dropdown
					selected={TABLE_NAMES[activeTableNumber]}
					onDropdownChange={handleTableNameChange}
					options={TABLE_NAMES}
				/>
				{charsListTable.length > 0
					&& <ListNavigation charsList={charsListTable[activeTableNumber]} />}
				{ songsList.length > 0 && mode === 'list'
					&& <SongsList songsTable={songsList[activeTableNumber][1]} />}
				{ songsList.length > 0 && mode === 'copy'
					&& <SongsCopy songsTable={songsList[activeTableNumber][1]} />}
				{!isLoading && <Toolbar />}
				<ScrollUpButton />
			</Grid>
		</Block>
	);
}
