import { toTimeFormat } from '~helpers/toTimeFormat';

import { Block } from '~/ameliance-ui/components/blocks';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './ProgressBar.module.scss';

interface ProgressBarProps {
	duration: number;
	timeProgress: number;
	audioRef: React.RefObject<HTMLAudioElement>;
	progressBarRef: React.RefObject<HTMLInputElement>;
}

export function ProgressBar({
	duration,
	timeProgress,
	audioRef,
	progressBarRef,
}: ProgressBarProps) {
	const handleInputOnChange = () => {
		if (audioRef.current && progressBarRef.current) {
			const reassignAudioRef = audioRef.current;
			reassignAudioRef.currentTime = Number(progressBarRef.current.value);
		}
	};

	return (
		<Block className={s.ProgressBar}>
			<Typography component="p2" className={s.timeProgress}>{toTimeFormat(timeProgress)}</Typography>
			<input
				type="range"
				className={s.range}
				onChange={handleInputOnChange}
				defaultValue="0"
				ref={progressBarRef}
			/>
			<Typography component="p2" className={s.duration}>{toTimeFormat(duration)}</Typography>
		</Block>
	);
}
