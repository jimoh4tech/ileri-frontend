import axios from 'axios';
import { NewUser } from '../interfaces/user.interfaces';
import { token } from './auth';
const baseUrl = '/api/v1/users';

const createUser = async (user: NewUser) => {
	const res = await axios.post(baseUrl, user);
	return res.data;
};

const getAll = async () => {
	const res = await axios.get(baseUrl, {
		headers: { Authorization: token },
	});
	return res.data;
};

const updateUser = async (id: string, data: any) => {
	const res = await axios.put(`${baseUrl}/${id}`, data, {
		headers: { Authorization: token },
	});
	return res.data;
};

const updateUserInfo = async (id: string, name: string, phone: string) => {
	const res = await axios.put(
		`${baseUrl}/${id}/user`,
		{ name, phone },
		{
			headers: { Authorization: token },
		}
	);
	return res.data;
};

const deleteUser = async (id: string) => {
	const res = await axios.delete(`${baseUrl}/${id}`, {
		headers: { Authorization: token },
	});
	return res.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { createUser, getAll, updateUser, updateUserInfo, deleteUser };
