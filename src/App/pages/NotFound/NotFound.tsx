import { Block } from '~/asmlib/components/blocks/Block';
import { Grid } from '~/asmlib/components/Grid';
import { Typography } from '~/asmlib/components/Typography';

import s from './NotFound.module.scss';

export function NotFound() {
	return (
		<Block component="main">
			<Grid container component="section" className={s.container}>
				<Block className={s.title}>
					<Typography component="p1" display="h1" className={s.title40}>40</Typography>
					<Typography component="p1" display="h1" className={s.title4}>4</Typography>
				</Block>
				<Block className={s.description}>
					<Typography component="p2">
						Вибачте, сторінки не існує
						<br />
						або функціонал ще в процесі розробки
						<br />
						¯\_(ツ)_/¯
					</Typography>
				</Block>
			</Grid>
		</Block>
	);
}
