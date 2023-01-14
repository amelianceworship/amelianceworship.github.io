import { useTypedSelector } from '~store/hooks/useTypedSelector';

export function useAuth() {
	const { uid } = useTypedSelector((state) => state.userReducer);
	return {
		isAuth: !!uid,
	};
}
