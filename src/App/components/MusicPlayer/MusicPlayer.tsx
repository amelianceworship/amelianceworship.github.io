import { useEffect, useRef, useState } from 'react';

import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';

import { Block } from '~/ameliance-ui/components/blocks';

import { Controls } from './Controls/Controls';
import { DisplayTrack } from './DisplayTrack/DisplayTrack';
import { ProgressBar } from './ProgressBar/ProgressBar';

import s from './MusicPlayer.module.scss';

export function MusicPlayer() {
	const [isPlaying, setIsPlaying] = useState(false);

	const { audioFilesList, currentSong } = useTypedSelector((state) => state.musicPlayerReducer);
	const { actions } = musicPlayerSlice;
	const dispatch = useTypedDispatch();

	const [trackIndex, setTrackIndex] = useState(0);
	const [currentTrack, setCurrentTrack] = useState(audioFilesList[trackIndex]);
	const [timeProgress, setTimeProgress] = useState(0);
	const [duration, setDuration] = useState(0);

	const audioRef = useRef<HTMLAudioElement>(null);
	const progressBarRef = useRef<HTMLInputElement>(null);

	const handleNext = () => {
		if (trackIndex >= audioFilesList.length - 1) {
			setTrackIndex(0);
			setCurrentTrack(audioFilesList[0]);
			dispatch(actions.setCurrentSong(audioFilesList[0]));
		} else {
			setTrackIndex((prev: number) => prev + 1);
			setCurrentTrack(audioFilesList[trackIndex + 1]);
			dispatch(actions.setCurrentSong(audioFilesList[trackIndex + 1]));
		}
	};

	useEffect(() => {
		if (audioFilesList.length > 0 && currentSong) {
			const newTrackIndex = audioFilesList.indexOf(currentSong);
			setTrackIndex(newTrackIndex);
			setCurrentTrack(audioFilesList[newTrackIndex]);
			setIsPlaying(true);
		}

		if (!currentSong) {
			setIsPlaying(false);
		}
	}, [audioFilesList, currentSong]);

	return (
		<Block className={s.MusicPlayer}>
			<DisplayTrack
				currentTrack={currentTrack}
				audioRef={audioRef}
				progressBarRef={progressBarRef}
				setDuration={setDuration}
				handleNext={handleNext}
			/>
			<ProgressBar
				audioRef={audioRef}
				progressBarRef={progressBarRef}
				timeProgress={timeProgress}
				duration={duration}
			/>
			<Controls
				tracks={audioFilesList}
				trackIndex={trackIndex}
				setTrackIndex={setTrackIndex}
				setCurrentTrack={setCurrentTrack}
				duration={duration}
				timeProgress={timeProgress}
				setTimeProgress={setTimeProgress}
				audioRef={audioRef}
				progressBarRef={progressBarRef}
				handleNext={handleNext}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
			/>
		</Block>
	);
}
