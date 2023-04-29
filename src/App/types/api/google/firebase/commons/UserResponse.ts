import type { User } from './User';

export interface UserResponse extends Partial<User> {
	uid: string;
}
