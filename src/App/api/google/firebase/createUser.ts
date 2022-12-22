import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { CreateUser } from '~types/api/google/firebase/auth/createUser';

export async function createUser({ email, password }: CreateUser) {
	const auth = getAuth();
	return createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const { user } = userCredential;
			return user;
		})
		.catch((error) => ({
			errorCode: error.code,
			errorMessage: error.message,
		}));
}
