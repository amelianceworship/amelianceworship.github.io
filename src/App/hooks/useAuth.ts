import { useTypedSelector } from '~store/hooks/useTypedSelector';

export function useAuth() {
	const { displayName, status } = useTypedSelector((state) => state.userReducer);
	return {
		isAuth: !!displayName,
		isOwner: status === 'owner',
		isAdmin: status === 'admin',
		isUser: status === 'user',
	};
}
