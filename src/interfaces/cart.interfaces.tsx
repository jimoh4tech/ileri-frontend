import { Item } from "./item.interfaces";
import { User } from "./user.interfaces";

export interface CartItem {
	item: Item;
	quantity: number;
}
export interface Cart {
	id: string;
	items: CartItem[];
	user: User;
}
export interface NewCartItem {
	itemId: string;
	quantity: number;
}
