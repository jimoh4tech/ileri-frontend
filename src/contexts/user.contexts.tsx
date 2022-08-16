import { createContext } from 'react';
import { IUser } from '../interfaces/user.interfaces';

export const CurrentUserContext = createContext<{
	currentUser: IUser | null;
	setCurrentUser: any;
}>({ currentUser: null, setCurrentUser: null });
