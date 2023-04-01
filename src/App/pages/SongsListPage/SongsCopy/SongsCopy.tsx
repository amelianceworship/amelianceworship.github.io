import { useState } from 'react';

import type { SongsGroup } from '~store/songsList/actions/fetchSongsList';

import { Block } from '~/ameliance-ui/components/blocks';
import { List } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import { SongListItem } from './SongListItem/SongListItem';

import s from './SongsCopy.module.scss';

// export interface SongItem {
// 	position: string;
// 	value: string;
// 	active: boolean;
// }
// export type ConvertedTable = [string, SongItem[]];

interface SongsCopy {
	songsTable: SongsGroup[];
}

export function SongsCopy({ songsTable }: SongsCopy) {
	// const [convertedTable, setConvertedTable] = useState<ConvertedTable[]>(
	// 	songsTable
	// 		.map((group) => [
	// 			group[0],
	// 			group[1].map((song) => ({ ...song, active: false })),
	// 		]),
	// );

	return (
		<Block className={s.SongsCopy}>
			{songsTable.map((songGroup) => (
				<Block className={s.songsGroup} key={songGroup[0]}>
					<Typography component="h3" className={s.songsGroupSymbol} id={songGroup[0]}>{songGroup[0]}</Typography>
					<List className={s.songsNames}>
						{songGroup[1].map((song) => <SongListItem key={song.position} song={song} />)}
					</List>
				</Block>
			))}
		</Block>
	);
}
