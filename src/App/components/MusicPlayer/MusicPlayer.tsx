import { useEffect, useRef, useState } from 'react';

import { join } from '~/ameliance-scripts';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';

import { Block } from '~/ameliance-ui/components/blocks';
import { useTransition } from '~/ameliance-ui/hooks/useTransition';

import { Controls } from './Controls/Controls';
import { DisplayTrack } from './DisplayTrack/DisplayTrack';
import { ProgressBar } from './ProgressBar/ProgressBar';

import s from './MusicPlayer.module.scss';

export function MusicPlayer() {
	const {
		audioTracksList,
		lastOpenedTrack,
		currentTrack,
		isPlaying,
		currentTrackIndex,
		currentTrackTimeProgress,
	} = useTypedSelector((state) => state.musicPlayerReducer);
	const dispatch = useTypedDispatch();
	const { actions } = musicPlayerSlice;

	const [timeProgress, setTimeProgress] = useState(
		lastOpenedTrack === currentTrack ? currentTrackTimeProgress : 0,
	);

	useEffect(() => {
		if (!isPlaying) {
			dispatch(actions.setCurrentTrackTimeProgress(timeProgress));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlaying]);

	const audioRef = useRef<HTMLAudioElement>(null);
	const progressBarRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		dispatch(actions.setCurrentTrack(audioTracksList[currentTrackIndex]));

		if (audioRef.current && timeProgress > 0) {
			const reassignAudioRef = audioRef.current;
			reassignAudioRef.currentTime = timeProgress;
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { transitionClass, handleOnTransitionEnd, runEndTransition } = useTransition({
		startTransitionClass: s.show,
		onTransitionEndAction: () => {
			dispatch(actions.hidePlayer());
			dispatch(actions.setIsPlaying(false));
			dispatch(actions.setCurrentTrackTimeProgress(timeProgress));
		},
	});

	useEffect(() => {
		if (audioTracksList.length > 0 && currentTrack) {
			const newTrackIndex = audioTracksList.indexOf(currentTrack);
			dispatch(actions.setCurrentTrackIndex(newTrackIndex));
			dispatch(actions.setCurrentTrack(audioTracksList[newTrackIndex]));
			dispatch(actions.setIsPlaying(true));
		}

		if (!currentTrack) {
			dispatch(actions.setIsPlaying(false));
		}
	}, [actions, audioTracksList, currentTrack, dispatch]);

	return (
		<Block
			className={join(s.MusicPlayer, transitionClass)}
			onTransitionEnd={handleOnTransitionEnd}
		>
			<DisplayTrack
				timeProgress={timeProgress}
				audioRef={audioRef}
				progressBarRef={progressBarRef}
				onClose={runEndTransition}
			/>
			<ProgressBar
				timeProgress={timeProgress}
				audioRef={audioRef}
				progressBarRef={progressBarRef}
			/>
			<Controls
				timeProgress={timeProgress}
				setTimeProgress={setTimeProgress}
				audioRef={audioRef}
				progressBarRef={progressBarRef}
			/>
		</Block>
	);
}
