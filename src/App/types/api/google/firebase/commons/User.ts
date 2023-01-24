export interface User {
	uid: string;
	displayName: string;
	photoURL: string;
	email: string;
	status: 'user' | 'admin' | 'owner';
	sex: 'male' | 'female' | 'unknown';
	role: string;
	lastActiveChatId: string;
	lastVisitDate: string;
	isOnline: boolean;
}
