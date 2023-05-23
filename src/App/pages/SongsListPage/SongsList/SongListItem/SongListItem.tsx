import { forwardRef, useEffect } from 'react';

import { motion, useAnimation } from 'framer-motion';

import { join } from '~/ameliance-scripts';
import useLongPress from '~hooks/useLongPress';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';
import type { SongItem } from '~store/songsList/actions/fetchSongsListData';
import { songsListSlice } from '~store/songsList/songsListSlice';

import { Block } from '~/ameliance-ui/components/blocks';
import { Button } from '~/ameliance-ui/components/Button';
import { Icon } from '~/ameliance-ui/components/Icon';
import { CheckIcon } from '~/ameliance-ui/components/icons/CheckIcon';
import { PauseIcon } from '~/ameliance-ui/components/icons/PauseIcon';
import { PlayIcon } from '~/ameliance-ui/components/icons/PlayIcon';
import type { ListItemElement, ListItemProps } from '~/ameliance-ui/components/List';
import { ListItem } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './SongListItem.module.scss';

type ComponentElementType = ListItemElement;

export interface SongListItemProps extends Omit<ListItemProps, 'ref'> {
	song: SongItem;
}

const MotionTypography = motion(Typography);

export const SongListItem = forwardRef<ComponentElementType, SongListItemProps>(({
	song,
	...rest
}, ref: React.Ref<ComponentElementType>) => {
	const dispatch = useTypedDispatch();

	// PLAYER
	const {
		audioTracksList,
		currentTrack,
		isPlaying,
	} = useTypedSelector((state) => state.musicPlayerReducer);

	const { actions: musicPlayerActions } = musicPlayerSlice;

	const handlePlayPauseButtonOnClick = () => {
		dispatch(musicPlayerActions.showPlayer());
		dispatch(musicPlayerActions.toggleIsPlaying());
		if (currentTrack && currentTrack.includes(song.value)) {
			// dispatch(musicPlayerActions.setCurrentTrack(null));
		} else {
			dispatch(musicPlayerActions.setCurrentTrack(song.value));
		}
	};

	const buttonType = isPlaying && (currentTrack === song.value) ? 'secondary' : 'text';
	const playingClass = isPlaying && (currentTrack === song.value) && s.playing;

	// SELECTION
	const {
		namesList, nameListLimitCount, selectedSongsId, pageMode,
	} = useTypedSelector((state) => state.songsListReducer);

	const { actions: songsListActions } = songsListSlice;

	const isActive = selectedSongsId.includes(song.position);

	const activeClass = isActive && s.active;

	const textBlockClass = [
		pageMode === 'selection' && s.selection,
	];

	const handleListItemOnClick = () => {
		if (pageMode !== 'selection') return;
		if (namesList.length < nameListLimitCount) {
			dispatch(songsListActions.toggleSetToSelectedSongsId(song.position));
		} else {
			dispatch(songsListActions.removeFromSelectedSongsId(song.position));
		}

		dispatch(songsListActions.toggleSetToNamesList(song.value));
	};

	// LONG TAP
	const { actions } = songsListSlice;

	const handleLongPress = () => {
		dispatch(actions.setPageMode('selection'));
	};

	const longPressHandlers = useLongPress(handleLongPress);

	// ANIMATION
	const controls = useAnimation();
	useEffect(() => {
		if (pageMode === 'selection') {
			controls.set({ x: -32 });
			controls.start({ x: 0, transition: { type: 'tween', ease: 'easeOut', duration: 0.8 } });
		} else {
			controls.set({ x: 32 });
			controls.start({ x: 0, transition: { type: 'tween', ease: 'easeOut', duration: 0.8 } });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageMode]);

	return (
		<ListItem
			className={join(s.SongListItem, activeClass)}
			key={song.position}
			ref={ref}
			{...rest}
			{...longPressHandlers}
		>
			<Block className={join(s.textBlock, textBlockClass)} onClick={handleListItemOnClick}>
				{pageMode === 'selection' && (
					<Icon className={join(s.checkIcon, activeClass)}>
						<CheckIcon size="small" />
					</Icon>
				)}
				<MotionTypography
					component="p1"
					id={`song_${song.position}`}
					className={s.songName}
					animate={controls}
				>
					{song.value}
				</MotionTypography>
			</Block>
			{audioTracksList.includes(song.value) && (
				<Button
					type={buttonType}
					size="small"
					onClick={handlePlayPauseButtonOnClick}
					className={join(playingClass)}
					disabled={!audioTracksList.includes(song.value)}
				>
					{audioTracksList.includes(song.value)
						&& (isPlaying && (currentTrack === song.value)
							? <PauseIcon size="small" />
							: <PlayIcon size="small" className={s.playIcon} />)}

				</Button>
			)}
		</ListItem>
	);
});

SongListItem.displayName = 'SongListItem';
