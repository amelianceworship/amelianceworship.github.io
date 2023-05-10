import { useTypedSelector } from '~store/hooks/useTypedSelector';

export function useAuth() {
	const { user } = useTypedSelector((state) => state.userReducer);
	const { uid, userType, sex } = user;

	return {
		isAuth: !!uid,
		isOwner: userType === 'owner',
		isAdmin: userType === 'admin',
		isUser: userType === 'user',
		isFillProfile: !!sex,
	};
}
