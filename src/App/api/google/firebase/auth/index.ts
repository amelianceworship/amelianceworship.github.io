import { createUser } from './createUser';
import { getCurrentAuthUser } from './getCurrentAuthUser';
import { signIn } from './signIn';
import { signInWithGoogle } from './signInWithGoogle';
import { signOut } from './signOut';
import { updateProfile } from './updateProfile';

export const auth = {
	createUser,
	getCurrentAuthUser,
	signIn,
	signInWithGoogle,
	signOut,
	updateProfile,
};
