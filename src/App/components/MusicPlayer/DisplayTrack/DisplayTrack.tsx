import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';

import { AudioPlayer } from '~/ameliance-ui/components/_LAB/AudioPlayer';
import { Block } from '~/ameliance-ui/components/blocks';
import { Icon } from '~/ameliance-ui/components/Icon';
import { XIcon } from '~/ameliance-ui/components/icons/XIcon';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './DisplayTrack.module.scss';

interface DisplayTrackProps {
	timeProgress: number;
	audioRef: React.RefObject<HTMLAudioElement>;
	progressBarRef: React.RefObject<HTMLInputElement>;
	onClose: () => void;
}

export function DisplayTrack({
	timeProgress,
	audioRef,
	progressBarRef,
	onClose,
}: DisplayTrackProps) {
	const { currentTrack } = useTypedSelector((state) => state.musicPlayerReducer);
	const { actions } = musicPlayerSlice;
	const dispatch = useTypedDispatch();

	const onLoadedMetadataHandler = () => {
		if (audioRef.current && progressBarRef.current) {
			const reassignAudioRef = audioRef.current;
			const seconds = Math.trunc(reassignAudioRef.duration);
			dispatch(actions.setCurrentTrackDuration(seconds));

			const reassignProgressBarRef = progressBarRef.current;
			reassignProgressBarRef.max = seconds.toString();
		}
	};

	const onEndedHandler = () => {
		dispatch(actions.nextTrack());
	};

	const handleCloseIconOnClick = () => {
		onClose();
	};

	return (
		<Block className={s.DisplayTrack}>
			<AudioPlayer
				src={`/mp3/${currentTrack}.mp3`}
				ref={audioRef}
				onLoadedMetadata={onLoadedMetadataHandler}
				onEnded={onEndedHandler}
			/>
			<Typography component="h6">{currentTrack}</Typography>
			<Icon onClick={handleCloseIconOnClick}><XIcon size="small" /></Icon>
		</Block>
	);
}
