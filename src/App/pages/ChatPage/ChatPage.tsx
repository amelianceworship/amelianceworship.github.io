import asm from 'asm-ts-scripts';

import { Chat } from './Chat';
import s from './ChatPage.module.scss';
import { Sidebar } from './Sidebar';

export function ChatPage() {
	return (
		<main className={asm.joinClasses(s.ChatPage, 'main')}>
			<div className={asm.joinClasses(s.container, 'container')}>
				<Sidebar />
				<Chat />
			</div>
		</main>
	);
}
