import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';
import type { SongItem } from '~store/songsList/actions/fetchSongsList';

import { Button } from '~/ameliance-ui/components/Button';
import { PauseIcon } from '~/ameliance-ui/components/icons/PauseIcon';
import { PlayIcon } from '~/ameliance-ui/components/icons/PlayIcon';
import { ListItem } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './SongListItem.module.scss';

interface SongListItem {
	song: SongItem;
}

export function SongListItem({
	song,
}: SongListItem) {
	const { audioFilesList, currentSong } = useTypedSelector((state) => state.musicPlayerReducer);

	const { actions } = musicPlayerSlice;
	const dispatch = useTypedDispatch();
	const handlePlayPauseButtonOnClick = () => {
		if (currentSong && currentSong.includes(song.value)) {
			dispatch(actions.setCurrentSong(null));
		} else {
			dispatch(actions.setCurrentSong(song.value));
		}
		dispatch(actions.showPlayer());
	};

	const isPlaying = currentSong && currentSong.includes(song.value);

	const buttonType = isPlaying ? 'secondary' : 'text';

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
			{audioFilesList.includes(song.value)
				&& (
					<Button
						type={buttonType}
						size="small"
						onClick={handlePlayPauseButtonOnClick}
					>
						{isPlaying
							? <PauseIcon size="small" />
							: <PlayIcon size="small" className={s.playIcon} />}
					</Button>
				)}
		</ListItem>
	);
}
