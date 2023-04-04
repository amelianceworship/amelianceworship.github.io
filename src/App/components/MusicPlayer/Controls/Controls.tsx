import {
	useCallback, useEffect, useRef,
} from 'react';

import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';

import { Block } from '~/ameliance-ui/components/blocks';
import { Button } from '~/ameliance-ui/components/Button';
import { ChevronsLeftIcon } from '~/ameliance-ui/components/icons/ChevronsLeftIcon';
import { ChevronsRightIcon } from '~/ameliance-ui/components/icons/ChevronsRightIcon';
import { PauseIcon } from '~/ameliance-ui/components/icons/PauseIcon';
import { PlayIcon } from '~/ameliance-ui/components/icons/PlayIcon';
import { SkipBackIcon } from '~/ameliance-ui/components/icons/SkipBackIcon';
import { SkipForwardIcon } from '~/ameliance-ui/components/icons/SkipForwardIcon';

import s from './Controls.module.scss';

interface Controls {
	tracks: string[];
	trackIndex: number;
	setTrackIndex: (arg: ((trackIndex: number) => number) | number) => void;
	setCurrentTrack: (track: string) => void;
	duration: number;
	timeProgress: number;
	setTimeProgress: (time: number) => void;
	audioRef: React.RefObject<HTMLAudioElement>;
	progressBarRef: React.RefObject<HTMLInputElement>;
	handleNext: () => void;
	isPlaying: boolean;
	setIsPlaying: (callback: (arg: boolean) => boolean) => void;
}

export function Controls({
	tracks,
	trackIndex,
	setTrackIndex,
	setCurrentTrack,
	duration,
	timeProgress,
	setTimeProgress,
	audioRef,
	progressBarRef,
	handleNext,
	isPlaying,
	setIsPlaying,
}: Controls) {
	const playAnimationRef = useRef<number>();

	const { actions } = musicPlayerSlice;
	const dispatch = useTypedDispatch();

	const repeat = useCallback(() => {
		if (audioRef.current && progressBarRef.current) {
			const { currentTime } = audioRef.current;
			setTimeProgress(currentTime);
			const reassignProgressBarRef = progressBarRef.current;
			reassignProgressBarRef.value = currentTime.toString();
			reassignProgressBarRef.style.setProperty(
				'--progress-bar--range-progress',
				`${(Number(reassignProgressBarRef.value) / Math.trunc(duration)) * 100}%`,
			);

			if (isPlaying) {
				playAnimationRef.current = requestAnimationFrame(repeat);
			}
		}
	}, [audioRef, duration, isPlaying, progressBarRef, setTimeProgress]);

	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.play();
				playAnimationRef.current = requestAnimationFrame(repeat);
			} else {
				audioRef.current.pause();
				if (playAnimationRef.current) cancelAnimationFrame(playAnimationRef.current);
			}
		}
	}, [isPlaying, audioRef, repeat]);

	const handlePlayPauseIconOnClick = () => {
		setIsPlaying((prev) => !prev);

		if (isPlaying) {
			dispatch(actions.setCurrentSong(null));
		} else {
			dispatch(actions.setCurrentSong(tracks[trackIndex]));
		}
	};

	const skipForwardOnClick = () => {
		if (audioRef.current) {
			const reassignAudioRef = audioRef.current;
			reassignAudioRef.currentTime += 10;
		}
	};

	const skipBackwardOnClick = () => {
		if (audioRef.current) {
			const reassignAudioRef = audioRef.current;
			reassignAudioRef.currentTime -= 10;
		}
	};

	const handlePreviousOnClick = () => {
		if (timeProgress >= 1) {
			setTimeProgress(0);
			if (audioRef.current) {
				const reassignAudioRef = audioRef.current;
				reassignAudioRef.currentTime = 0;
			}
		} else if (trackIndex === 0) {
			const lastTrackIndex = tracks.length - 1;
			setTrackIndex(lastTrackIndex);
			setCurrentTrack(tracks[lastTrackIndex]);
			dispatch(actions.setCurrentSong(tracks[trackIndex]));
		} else {
			setTrackIndex((prev: number) => prev - 1);
			setCurrentTrack(tracks[trackIndex - 1]);
			dispatch(actions.setCurrentSong(tracks[trackIndex - 1]));
		}
	};

	const handleNextOnClick = () => {
		if (handleNext) handleNext();
	};

	return (
		<Block className={s.Controls}>
			<Button type="text" onClick={handlePreviousOnClick}>
				<SkipBackIcon />
			</Button>
			<Button type="text" onClick={skipBackwardOnClick}>
				<ChevronsLeftIcon />
			</Button>
			<Button type="secondary" onClick={handlePlayPauseIconOnClick}>
				{isPlaying ? <PauseIcon /> : <PlayIcon className={s.playIcon} />}
			</Button>
			<Button type="text" onClick={skipForwardOnClick}>
				<ChevronsRightIcon />
			</Button>
			<Button type="text" onClick={handleNextOnClick}>
				<SkipForwardIcon />
			</Button>
		</Block>
	);
}
