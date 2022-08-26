import axios from 'axios';
import { token } from './auth';

const baseUrl = 'https://ileri-api.herokuapp.com/api/v1/items';

const createProduct = async (data: any) => {
	const res = await axios.post(baseUrl, data, {
		headers: { Authorization: token },
	});
	return res.data;
}

const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};


const updateProduct = async (id: string, data: any) => {
	const res = await axios.put(`${baseUrl}/${id}`, data, {
		headers: { Authorization: token },
	});
	return res.data;
}

const toggleStockedItem =async (id:string) => {
	const res = await axios.put(`${baseUrl}/${id}/stock`, {}, {
		headers: { Authorization: token },
	});
	return res.data;
}

const deleteItem = async (id: string) => {
	const res = await axios.delete(
		`${baseUrl}/${id}/`,
		{
			headers: { Authorization: token },
		}
	);
	return res.data;
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {createProduct, getAll, updateProduct, toggleStockedItem, deleteItem };