import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';

import { AudioPlayer } from '~/ameliance-ui/components/_LAB/AudioPlayer';
import { Block } from '~/ameliance-ui/components/blocks';
import { Icon } from '~/ameliance-ui/components/Icon';
import { XIcon } from '~/ameliance-ui/components/icons/XIcon';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './DisplayTrack.module.scss';

interface DisplayTrackProps {
	currentTrack: string;
	setDuration: (duration: number) => void;
	audioRef: React.RefObject<HTMLAudioElement>;
	progressBarRef: React.RefObject<HTMLInputElement>;
	handleNext?: () => void;
}

export function DisplayTrack({
	currentTrack,
	setDuration,
	audioRef,
	progressBarRef,
	handleNext,
}: DisplayTrackProps) {
	const { actions } = musicPlayerSlice;
	const dispatch = useTypedDispatch();

	const onLoadedMetadataHandler = () => {
		if (audioRef.current && progressBarRef.current) {
			const seconds = audioRef.current.duration;
			setDuration(seconds);
			const reassignAudioRef = progressBarRef.current;
			reassignAudioRef.max = seconds.toString();
		}
	};

	const handleOnEnded = () => {
		if (handleNext) handleNext();
	};

	const handleCloseIconOnClick = () => {
		dispatch(actions.setCurrentSong(null));
		dispatch(actions.hidePlayer());
	};

	return (
		<Block className={s.DisplayTrack}>
			<AudioPlayer
				src={`./assets/mp3/${currentTrack}.mp3`}
				ref={audioRef}
				onLoadedMetadata={onLoadedMetadataHandler}
				onEnded={handleOnEnded}
			/>
			<Typography component="h6">{currentTrack}</Typography>
			<Icon onClick={handleCloseIconOnClick}><XIcon size="small" /></Icon>
		</Block>
	);
}
