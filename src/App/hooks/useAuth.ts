import { useTypedSelector } from '~store/hooks/useTypedSelector';

export function useAuth() {
	const { email, token, id } = useTypedSelector((state) => state.userReducer);
	return {
		isAuth: !!id,
		email,
		token,
		id,
	};
}
