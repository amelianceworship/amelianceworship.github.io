import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import type { SongsGroup } from '~store/songsList/actions/fetchSongsListData';

import { Block } from '~/ameliance-ui/components/blocks';
import { List } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import { SongListItem } from './SongListItem/SongListItem';

import s from './SongsList.module.scss';

interface SongsList {
	songsTable: SongsGroup[];
}

const MotionSongListItem = motion(SongListItem);
const MotionTypography = motion(Typography);

const variants: Variants = {
	hidden: { opacity: 0 },
	visible: (i: number) => ({ opacity: 1, transition: { delay: 0.05 * i } }),
};

export function SongsList({
	songsTable,
}: SongsList) {
	return (
		<Block className={s.SongsList}>
			{songsTable.map((songGroup) => (songGroup[1].length > 0
					&& (
						<Block className={s.songsGroup} key={songGroup[0]}>
							<MotionTypography
								component="h3"
								className={s.songsGroupSymbol}
								id={songGroup[0]}
								variants={variants}
								initial="hidden"
								animate="visible"
							>
								{songGroup[0]}
							</MotionTypography>
							<List className={s.songsNames}>
								{songGroup[1].map((song, index) => (
									<MotionSongListItem
										key={song.position}
										song={song}
										variants={variants}
										initial="hidden"
										animate="visible"
										custom={index}
										whileDrag={{ scale: 0.9 }}
									/>
								))}
							</List>
						</Block>
					)))}
		</Block>
	);
}
