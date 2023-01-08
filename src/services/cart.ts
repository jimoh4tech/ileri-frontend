import axios from 'axios';
import { NewCartItem } from '../interfaces/cart.interfaces';
import { CartItemProps } from '../interfaces/item.interfaces';
import { token } from './auth';

const baseUrl = 'https://ileri-api.onrender.com/api/v1/carts';

const addItemToCart = async (item: NewCartItem) => {
	const res = await axios.post(baseUrl, item, {
		headers: { Authorization: token },
	});
	return res.data;
};

const getCartItems = async (): Promise<CartItemProps[]> => {
	const res = await axios.get(baseUrl, {
		headers: { Authorization: token },
	});
	return res.data;
};

const updateCartItems = async (
	itemId: string,
	value: number
): Promise<CartItemProps[]> => {
	const res = await axios.put(
		`${baseUrl}/${itemId}/update?value=${value}`,
		{},
		{
			headers: { Authorization: token },
		}
	);
	return res.data;
};

const removeCartItems = async (itemId: string): Promise<CartItemProps[]> => {
	const res = await axios.put(
		`${baseUrl}/${itemId}/remove`,
		{},
		{
			headers: { Authorization: token },
		}
	);
	return res.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
	addItemToCart,
	getCartItems,
	updateCartItems,
	removeCartItems,
};
