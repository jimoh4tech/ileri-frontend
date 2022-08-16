export interface RatingProps {
	rating: number;
	numReviews: number;
}
export interface Item {
	id: string;
	name: string;
	category: string;
	imageUrl: string;
	price: number;
	discount: number;
	reviews: RatingProps;
	description?: string;
	stocked: boolean;
	deliveryValue: number;
}

export interface CartItemProps extends Omit<Item, 'discount' | 'reviews'>{
	quantity: number;
}
export interface ItemFilter extends Item {
	filterText: string;
}

export interface ItemCart extends Item {
	onClose: any;
	isOpen: boolean
}

export interface ItemAdmin extends Item{
	createdAt: string;
	updatedAt: string;
	setProducts?: any
}