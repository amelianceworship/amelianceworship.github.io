import { useEffect } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '~api/google/firebase/firebase';
import { api } from '~api/index';
import type { Messages } from '~types/api/google/firebase/commons/Messages';

interface UseGroupMessagesRealtime {
	chatId: string;
	lastText: string;
	setMessages: (messages: Messages) => void;
}

export function useGroupMessagesRealtime({
	chatId,
	lastText,
	setMessages,
}: UseGroupMessagesRealtime) {
	useEffect(() => {
		if (!chatId) return () => null;
		api.google.firebase.database.groups.updateGroupInfo({ chatId, lastText });

		const docRef = doc(db, 'groups', chatId);
		const unSub = onSnapshot(docRef, (document) => {
			const messages = document.exists() ? document.data().messages : null;
			if (messages) setMessages(messages);
		});

		return () => unSub();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
