import { motion } from 'framer-motion';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { ButtonLink } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './HomePage.module.scss';

const MotionGrid = motion(Grid);

export function HomePage() {
	return (
		<Block component="main" className={s.HomePage}>
			<MotionGrid
				container
				component="section"
				className={s.container}
				animate={{
					opacity: [0.5, 1],
				}}
			>
				<Typography component="h1">Вітаю на сайті 👋</Typography>
				<Typography component="h6">Сайт знаходиться в розробці</Typography>
				<Typography component="h6">Якщо ви знайшли баг або у вас є якісь пропозиції, побажання, коментарі, пишіть в Телеграм 😊</Typography>
				<ButtonLink href="https://t.me/amelianceskymusic" blank>Написати</ButtonLink>
			</MotionGrid>
		</Block>
	);
}
