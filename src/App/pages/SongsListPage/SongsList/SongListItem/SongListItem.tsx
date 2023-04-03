import type { SongItem } from '~store/songsList/actions/fetchSongsList';

import { ListItem } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './SongListItem.module.scss';

interface SongListItem {
	song: SongItem;
}

export function SongListItem({ song }: SongListItem) {
	return (
		<ListItem
			className={s.SongListItem}
			key={song.position}
		>
			<Typography
				component="p1"
				id={`song_${song.position}`}
			>
				{song.value}
			</Typography>
		</ListItem>
	);
}
