import { Dispatch, SetStateAction } from 'react';

export interface User {
	id: string;
	name: string;
	phone: string;
	password: string;
	email: string;
	role: string;
	address?: string;
	createdAt?: string;
}

export type NewUser = Omit<User, 'id' | 'role'>;

export interface IUser extends Omit<User, 'password'> {
	token: string;
	cart?: number;
	message?: string;
	status?: 'success' | 'error';
}

export interface UserContextProps {
	user: number | null;
	setUser: Dispatch<SetStateAction<number | null>>;
}

export interface UserAdmin extends Omit<User, 'password'> {
	setUsers: any
}
