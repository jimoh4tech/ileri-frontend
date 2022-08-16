import { createContext } from 'react';
import { CartItemProps } from '../interfaces/item.interfaces';

export const UserCartContext = createContext<{
	userCart: CartItemProps[] | undefined;
	setUserCart: any;
}>({ userCart: undefined, setUserCart: null });
