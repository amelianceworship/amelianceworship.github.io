import asm from 'asm-ts-scripts';

import { Button } from '~components/inputs/Button';

import s from './Home.module.scss';

export function Home() {
	return (
		<main className={asm.joinClasses(s.Home, 'main')}>
			<section className={asm.joinClasses(s.container, 'container')}>
				<h1 className="h1">Вітаю на сайті 👋</h1>
				<h6 className="h6">Сайт знаходиться в розробці</h6>
				<h6 className="h6">Якщо ви знайшли баг або у вас є якісь пропозиції, побажання, коментарі, пишіть в Телеграм😊</h6>
				<a href="https://t.me/amelianceskymusic" target="_blank" rel="noreferrer">
					<Button>Написати</Button>
				</a>
			</section>
		</main>
	);
}
