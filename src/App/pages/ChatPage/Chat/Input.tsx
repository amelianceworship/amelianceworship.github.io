import { useState } from 'react';

import { Button } from '~/asmlib/components/Button';
import { Icon } from '~components/Icon';
import { FileUpload } from '~components/inputs/FileUpload';
import { TextArea } from '~components/inputs/TextArea';

import s from './Input.module.scss';

export function Input() {
	const [message, setMessage] = useState(localStorage.getItem('chatTextInput') || '');

	const handleTextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const elem = event.target as HTMLTextAreaElement;
		localStorage.setItem('chatTextInput', elem.value);
		setMessage(elem.value);
	};

	const handleSend = () => {
		console.log(message);
		setMessage('');
	};

	const handleSendMessage = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			const nextSearchValue = message.trim();
			localStorage.setItem('chatTextInput', nextSearchValue);
			if (nextSearchValue) {
				handleSend();
			}
		}
	};

	return (
		<div className={s.input}>
			<TextArea value={message} onChange={handleTextInput} onKeyDown={handleSendMessage} placeholder="Type a message..." />
			{/* <Icon icon="icon--sun" isClickable /> */}
			<FileUpload icon="icon--image" />
			<FileUpload icon="icon--paperclip" />
			<Button callback={handleSend}>Send</Button>
		</div>
	);
}
