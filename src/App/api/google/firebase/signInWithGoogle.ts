import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { app, googleAuthProvider } from './firebase';

export async function signInWithGoogle() {
	const auth = getAuth(app);
	return signInWithPopup(auth, googleAuthProvider)
		.then((result) => {
			const { user } = result;
			return user;
		}).catch((error) => ({
			errorCode: error.code,
			errorMessage: error.message,
			email: error.customData.email,
			credential: GoogleAuthProvider.credentialFromError(error),
		}));
}
