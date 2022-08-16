import { Item } from './item.interfaces';

export interface OrderUI {
	address: string;
	phone: string | undefined;
	name: string | undefined;
	city: string;
	type: string;
	total: number;
	items: { itemId: Item; quantity: number }[];
	user: string | undefined;
	paymentRef: string;
	status?: string;
	createdAt?: string;
	updatedAt?: string;
	id?: string;
}

export interface OrderItemUI {
	imageUrl: string;
	name: string;
	id: string;
	status: string;
	updatedAt: string;
	createdAt: string;
	address: string;
	type: string;
	total: number;
	qauntity: number;
}

export interface OrderItemAdmin extends OrderUI {
	setOrders: any;
}