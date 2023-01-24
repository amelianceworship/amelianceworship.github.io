import { useTypedSelector } from '~store/hooks/useTypedSelector';

export function useAuth() {
	const { displayName } = useTypedSelector((state) => state.userReducer);
	return {
		isAuth: !!displayName,
	};
}
