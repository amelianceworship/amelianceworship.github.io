import { writeTextToClipboard } from '~helpers/writeTextToClipboard';
import type { SongValue } from '~store/songsList/actions/fetchSongsList';

import { useToast } from '~/ameliance-ui/components/_LAB/toastbar';
import { Button } from '~/ameliance-ui/components/Button';
import { CopyIcon } from '~/ameliance-ui/components/icons/CopyIcon';
import { ListItem } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './SongListItem.module.scss';

interface SongListItem {
	song: SongValue;
}

export function SongListItem({ song }: SongListItem) {
	const { add } = useToast();

	const handleCopyToClipboardOnClick = async () => {
		try {
			const result = await writeTextToClipboard(song.value);
			if (result) {
				add({
					title: 'Скопійовано:',
					message: song.value,
					duration: 3000,
				});
			}
		} catch (error) {
			add({
				type: 'error',
				message: 'Не вдалося скопіювати. Напишіть мені в Телеграм!',
				duration: 3000,
			});
		}
	};

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
			<Button size="custom" type="text" className={s.copyIcon} onClick={handleCopyToClipboardOnClick}>
				<CopyIcon size="small" />
			</Button>
		</ListItem>
	);
}
