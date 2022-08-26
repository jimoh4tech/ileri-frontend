import axios from 'axios';
import { NewUser } from '../interfaces/user.interfaces';
const baseUrl = 'https://ileri-api.herokuapp.com/api/v1/auth';

export let token: string = '';

const setToken = (newToken: string): void => {
	token = `bearer ${newToken}`;
};
const register = async (user: NewUser) => {
	const res = await axios.post(`${baseUrl}/register`, user);
	return res.data;
};

const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const res = await axios.post(`${baseUrl}/login`, { email, password });
	return res.data;
};

const changePassword = async (id:string, currentPassword: string, newPassword: string) => {
	const res = await axios.put(
		`${baseUrl}/${id}`,
		{ currentPassword, newPassword },
		{
			headers: { Authorization: token },
		}
	);
	return res.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { changePassword, login, register, setToken };
