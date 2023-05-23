import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';

import { AudioPlayer } from '~/ameliance-ui/components/_LAB/AudioPlayer';
import { Block } from '~/ameliance-ui/components/blocks';
import { Icon } from '~/ameliance-ui/components/Icon';
import { XIcon } from '~/ameliance-ui/components/icons/XIcon';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './DisplayTrack.module.scss';

const MotionTypography = motion(Typography);

const variants: Variants = {
	enter: (direction: number) => ({ x: `${100 * direction}%`, transition: { ease: 'easeOut', duration: 0.8 } }),
	visible: { x: 0, transition: { ease: 'easeOut', duration: 0.8 } },
	exit: (direction: number) => ({ x: `${-100 * direction}%`, transition: { ease: 'easeOut', duration: 0.8 } }),
	transition: { type: 'tween' },
};
interface DisplayTrackProps {
	audioRef: React.RefObject<HTMLAudioElement>;
	progressBarRef: React.RefObject<HTMLInputElement>;
	onClose: () => void;
}

export function DisplayTrack({
	audioRef,
	progressBarRef,
	onClose,
}: DisplayTrackProps) {
	const {
		currentTrack,
		trackSwitchingDirection,
	} = useTypedSelector((state) => state.musicPlayerReducer);
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
			<Block className={s.titleWrapper}>
				<AnimatePresence initial={false} mode="wait" custom={trackSwitchingDirection}>
					<MotionTypography
						component="h6"
						variants={variants}
						initial="enter"
						animate="visible"
						exit="exit"
						custom={trackSwitchingDirection}
						key={currentTrack}
					>
						{currentTrack}
					</MotionTypography>
				</AnimatePresence>
			</Block>
			<Icon onClick={handleCloseIconOnClick}><XIcon size="small" /></Icon>
		</Block>
	);
}
