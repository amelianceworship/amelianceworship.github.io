export interface User {
	uid: string;
	displayName: string;
	photoURL: string;
	email: string;
	status: 'user' | 'admin' | 'owner' | '';
	sex: 'male' | 'female' | '';
	role: string;
	lastActiveChatId: string;
	lastVisitDate: string;
	registrationDate: string;
	isOnline: boolean;
	visitsCount: number;
}
