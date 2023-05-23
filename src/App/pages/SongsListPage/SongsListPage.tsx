import { useEffect, useState } from 'react';

import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { getToday, isObjectEmpty } from '~/ameliance-scripts';
import { MusicPlayer } from '~components/MusicPlayer/MusicPlayer';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import type { SongsGroup } from '~store/songsList/actions/fetchSongsListData';
import { fetchSongsListData } from '~store/songsList/actions/fetchSongsListData';
import { songsListSlice } from '~store/songsList/songsListSlice';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Dropdown } from '~/ameliance-ui/components/Inputs/Dropdown';
import { SearchInput } from '~/ameliance-ui/components/Inputs/SearchInput';

import { EditStickyMenuWithOffset } from './EditStickyMenu/EditStickyMenuWithOffset';
import { ListNavigation } from './ListNavigation/ListNavigation';
import { ScrollUpButtonWithOffset } from './ScrollUpButton/ScrollUpButtonWithOffset';
import { SelectionBar } from './SelectionBar/SelectionBar';
import { SongsList } from './SongsList/SongsList';

import s from './SongsListPage.module.scss';

const MotionMusicPlayer = motion(MusicPlayer);

const musicPlayerVariants: Variants = {
	hidden: { y: '100%' },
	open: {
		y: 0,
		transition: {
			duration: 0.8,
		},
	},
	close: {
		y: '100%',
		transition: {
			duration: 0.8,
		},
	},
};

export function SongsListPage() {
	const [activeTableNumber, setActiveTableNumber] = useState(0);
	const [songsListTable, setSongsListTable] = useState<SongsGroup[]>();

	const {
		error, isLoading, songsList, tableGroupLabels, lastFetchingDate, listTitles,
		pageMode,
	} = useTypedSelector((state) => state.songsListReducer);

	const { isPlayerShow } = useTypedSelector((state) => state.musicPlayerReducer);

	const dispatch = useTypedDispatch();
	const { actions } = songsListSlice;

	useEffect(() => {
		const today = getToday();
		if (isObjectEmpty(songsList) || lastFetchingDate !== today) {
			dispatch(fetchSongsListData());
			dispatch(actions.setLastFetchingDate(today));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		if (songsList.length > 0) {
			const songsActiveTable = songsList[activeTableNumber][1];
			if (!searchValue) {
				setSongsListTable(songsActiveTable);
			} else {
				setSongsListTable(songsActiveTable.map((group) => [
					group[0],
					group[1]
						.filter((song) => song.value.toLowerCase().includes(searchValue.toLowerCase())),
				]));
			}
		}
	}, [activeTableNumber, songsList, searchValue]);

	const handleTableNameChange = (select: string) => {
		const tableNumber = listTitles.indexOf(select);
		setActiveTableNumber(tableNumber);
	};

	if (error) throw Error(error);

	const handleSearchOnChange = (value: string) => {
		setSearchValue(value);
	};

	return (
		<Block component="main" className={s.SongsListPage}>
			<Grid component="section" container className={s.container}>
				<Block className={s.tools}>
					{isLoading && <LoaderOverlay />}
					<Dropdown
						selected={listTitles[activeTableNumber]}
						onDropdownChange={handleTableNameChange}
						options={listTitles}
					/>
					<SearchInput
						placeholder="Пошук..."
						onChangeValue={handleSearchOnChange}
					/>
					{tableGroupLabels && tableGroupLabels.length > 0
					&& <ListNavigation charsList={tableGroupLabels[activeTableNumber]} />}
				</Block>
				{songsListTable && <SongsList songsTable={songsListTable} />}
			</Grid>
			<EditStickyMenuWithOffset />
			<ScrollUpButtonWithOffset />
			<AnimatePresence initial={false}>
				{ songsListTable && isPlayerShow
					&& (
						<MotionMusicPlayer
							variants={musicPlayerVariants}
							initial="hidden"
							animate="open"
							exit="close"
						/>
					)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{pageMode === 'selection' && songsListTable && <SelectionBar />}
			</AnimatePresence>
		</Block>
	);
}
