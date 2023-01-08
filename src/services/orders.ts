import axios from 'axios';
import { OrderUI } from '../interfaces/order.interfaces';
import { token } from './auth';

const baseUrl = 'https://ileri-api.onrender.com/api/v1/orders';

const createOrder = async (order: OrderUI) => {
	const res = await axios.post(baseUrl, order, {
		headers: { Authorization: token },
	});
	return res.data;
};

const getMyOrders = async () => {
	const res = await axios.get(baseUrl, {
		headers: { Authorization: token },
	});
	return res.data;
};

const getAllOrders = async () => {
	const res = await axios.get(`${baseUrl}/admin`, {
		headers: { Authorization: token },
	});
	return res.data;
};

const updateOrderStatus = async (id: string, status: string) => {
	const res = await axios.put(
		`${baseUrl}/${id}`,
		{ status },
		{
			headers: { Authorization: token },
		}
	);

	return res.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
