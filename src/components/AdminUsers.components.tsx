import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Spinner,
	Stack,
	Text,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { UserAdmin } from '../interfaces/user.interfaces';
import usersService from '../services/users';
import AlertComponent from './AlertComponent.components';


function User(userProps: UserAdmin) {
	const [status, setStatus] = useState<'error' | 'success' | undefined>();
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { setUsers, ...user } = userProps;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLessThan800] = useMediaQuery('(max-width: 800px)');

	async function handleSubmit(values: any) {
		try {
			const users = await usersService.updateUser(user.id, values);
			setUsers(users);
			setStatus('success');
			setMessage('User successfully updated');
			setTimeout(() => {
				onClose();
				setStatus(undefined);
				setMessage('');
			}, 2000);
		} catch (error: any) {
			setStatus('error');
			const errMessage: string = error.response.data.error
				? error.response.data.error
				: error.response.data;
			setMessage(errMessage);
			setTimeout(() => {
				setStatus(undefined);
				setMessage('');
			}, 5000);
		}
	}

	async function handleDeleteUser() {
		if (window.confirm('Are you sure you want to delete this user?'))
			try {
				setIsLoading(true);
				const users = await usersService.deleteUser(user.id);
				setUsers(users);
				setIsLoading(false);
			} catch (error: any) {
				const errMessage: string = error.response.data.error
					? error.response.data.error
					: error.response.data;
				alert(errMessage);
				setIsLoading(false);
			}
	}
	return (
		<>
			<Grid
				border='1px'
				borderRadius={'lg'}
				gap='2'
				p='2'
				templateColumns={isLessThan800 ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)'}
				alignItems='center'
			>
				<Text>{user.name}</Text>
				<Text>{user.phone}</Text>
				<Text>{user.email}</Text>
				<Button
					onClick={onOpen}
					colorScheme={'teal'}
					size='sm'
					maxW={'fit-content'}
				>
					Edit
				</Button>
				<Button
					colorScheme={'teal'}
					size='sm'
					maxW={'fit-content'}
					isLoading={isLoading}
					onClick={() => handleDeleteUser()}
				>
					Delete
				</Button>
			</Grid>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit User</ModalHeader>
					<ModalCloseButton />
					{message && <AlertComponent message={message} status={status} />}
					<Formik
						initialValues={{
							name: user.name,
							phone: user.phone,
							role: user.role,
						}}
						onSubmit={(values) => handleSubmit(values)}
					>
						{({ handleSubmit, isSubmitting, handleChange }) => (
							<form onSubmit={handleSubmit}>
								<ModalBody>
									<Stack spacing={4}>
										<FormControl id='firstName' isRequired>
											<FormLabel>Name</FormLabel>
											<Field as={Input} name='name' type='text' />
										</FormControl>

										<FormControl id='phone' isRequired>
											<FormLabel>Phone</FormLabel>
											<Field as={Input} name='phone' type='number' />
										</FormControl>

										<FormControl id='role' isRequired>
											<FormLabel>Role</FormLabel>
											<Select
												name='category'
												defaultValue={user.role}
												onChange={handleChange}
											>
												<option value='user'>User</option>
												<option value='admin'>Admin</option>
											</Select>
										</FormControl>
									</Stack>
								</ModalBody>
								<ModalFooter>
									<Button
										variant={'outline'}
										colorScheme='teal'
										mr={3}
										onClick={onClose}
									>
										Cancel
									</Button>
									<Button
										colorScheme={'teal'}
										type='submit'
										isLoading={isSubmitting}
										isDisabled={isSubmitting}
									>
										Save
									</Button>
								</ModalFooter>
							</form>
						)}
					</Formik>
				</ModalContent>
			</Modal>
		</>
	);
}

function AdminUsers() {
	const [users, setUsers] = useState<UserAdmin[] | null>(null);

	const { isLoading, error } = useQuery('users', () => fetchData());
	
	async function fetchData() {
		const data: UserAdmin[] = await usersService.getAll();
		setUsers(data);
		return data;
	}


	if (isLoading)
		return (
			<Flex minH={'300px'} justifyContent='center' alignItems='center'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='teal.500'
					size='xl'
				/>
			</Flex>
		);
	if (error)
		return (
			<Flex minH={'300px'} justifyContent='center' alignItems='center'>
				<Text fontWeight={'medium'}>
					Network Error. Check your internet connection and reload the page
				</Text>
			</Flex>
		);
	return (
		<Flex flexDir='column' gap={2} my='30px' >
			{users?.map((it) => (
				<User key={it.email} {...it} setUsers={setUsers} />
			))}
		</Flex>
	);
}

export default AdminUsers;
