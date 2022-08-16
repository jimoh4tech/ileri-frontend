import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { CurrentUserContext } from '../contexts/user.contexts';
import { IUser } from '../interfaces/user.interfaces';
import authService from '../services/auth';
import usersSerivce from '../services/users';
import AlertComponent from './AlertComponent.components';

interface EditUser {
	onClose: any;
	currentUser: IUser | null;
	setCurrentUser: any;
	setStatus: any;
	setMessage: any;
}

function EditDetails({
	onClose,
	currentUser,
	setCurrentUser,
	setStatus,
	setMessage,
}: EditUser) {
	const [username, setUsername] = useState(currentUser?.name || '');
	const [userPhone, setUserPhone] = useState(currentUser?.phone || '');

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			const user = await usersSerivce.updateUserInfo(
				currentUser?.id || '',
				username,
				userPhone
			);
			setStatus('success');
			setMessage('Details update successful');
			setCurrentUser({
				...currentUser,
				...user,
			});
			setTimeout(() => {
				setMessage('');
				onClose();
			}, 2000);
		} catch (error: any) {
			const errMessage: string =
				error.message === 'Network Error'
					? 'Network Error. Check your internet connection'
					: error.response.data.error
					? error.response.data.error
					: error.response.data;
			setStatus('error');
			setMessage(errMessage);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<ModalBody>
				<FormControl id='name' isRequired>
					<FormLabel>Name</FormLabel>
					<Input
						name='name'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</FormControl>

				<FormControl id='phone' isRequired>
					<FormLabel>Phone Number</FormLabel>
					<InputGroup>
						<InputLeftAddon children='+234' />
						<Input
							name='phone'
							type='tel'
							value={userPhone}
							onChange={(e) => setUserPhone(e.target.value)}
						/>
					</InputGroup>
				</FormControl>
			</ModalBody>
			<ModalFooter>
				<Button variant={'outline'} colorScheme='teal' mr={3} onClick={onClose}>
					Cancel
				</Button>
				<Button colorScheme={'teal'} type='submit'>
					Save
				</Button>
			</ModalFooter>
		</form>
	);
}

function ChangePassword({
	onClose,
	setCurrentUser,
	currentUser,
	setMessage,
	setStatus,
}: EditUser) {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	async function handleSubmit(e: any) {
    e.preventDefault();
		try {
			const user = await authService.changePassword(
				currentUser?.id || '',
				currentPassword,
				newPassword
			);
			setStatus('success');
			setMessage('Password update successful');
			setCurrentUser({
				...user,
			});
			setTimeout(() => {
				setMessage('');
				onClose();
			}, 2000);
		} catch (error: any) {
			const errMessage: string =
				error.message === 'Network Error'
					? 'Network Error. Check your internet connection'
					: error.response.data.error
					? error.response.data.error
					: error.response.data;
			setStatus('error');
			setMessage(errMessage);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<ModalBody>
				<FormControl isRequired>
					<FormLabel>Current Password</FormLabel>
					<InputGroup>
						<Input
							type={showCurrentPassword ? 'text' : 'password'}
							name='currentPassword'
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
						/>
						<InputRightElement h={'full'}>
							<Box
								onClick={() =>
									setShowCurrentPassword(
										(showCurrentPassword) => !showCurrentPassword
									)
								}
							>
								{showCurrentPassword ? (
									<BsEyeFill width={'10px'} />
								) : (
									<BsEyeSlashFill />
								)}
							</Box>
						</InputRightElement>
					</InputGroup>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>New Password</FormLabel>
					<InputGroup>
						<Input
							type={showNewPassword ? 'text' : 'password'}
							name='NewPassword'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
						<InputRightElement h={'full'}>
							<Box
								onClick={() =>
									setShowNewPassword((showNewPassword) => !showNewPassword)
								}
							>
								{showNewPassword ? (
									<BsEyeFill width={'10px'} />
								) : (
									<BsEyeSlashFill />
								)}
							</Box>
						</InputRightElement>
					</InputGroup>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Confirm Password</FormLabel>
					<InputGroup>
						<Input
							type={showConfirmPassword ? 'text' : 'password'}
							name='ConfirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<InputRightElement h={'full'}>
							<Box
								onClick={() =>
									setShowConfirmPassword(
										(showConfirmPassword) => !showConfirmPassword
									)
								}
							>
								{showConfirmPassword ? (
									<BsEyeFill width={'10px'} />
								) : (
									<BsEyeSlashFill />
								)}
							</Box>
						</InputRightElement>
					</InputGroup>
				</FormControl>
			</ModalBody>
			<ModalFooter>
				<Button variant={'outline'} colorScheme='teal' mr={3} onClick={onClose}>
					Cancel
				</Button>
				<Button
					colorScheme={'teal'}
					type='submit'
					isDisabled={newPassword !== confirmPassword}
				>
					Change
				</Button>
			</ModalFooter>
		</form>
	);
}

function Account() {
	const [status, setStatus] = useState<'success' | 'error'>('success');
	const [message, setMessage] = useState('');
	const [view, setView] = useState(true);
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function handleView(view: boolean) {
		setView(view);
		onOpen();
	}
	return (
		<Flex p={3} mt={3} gap={4} direction={'column'}>
			<Heading fontSize='xl' fontWeight='semibold'>
				Account Details
			</Heading>
			<Flex direction={'column'} gap={2}>
				<Text fontSize={isLessThan500 ? 'sm' : 'md'}>{currentUser?.name}</Text>
				<Text fontSize={isLessThan500 ? 'sm' : 'md'}>{currentUser?.email}</Text>
				<Text fontSize={isLessThan500 ? 'sm' : 'md'}>{currentUser?.phone}</Text>
				<Flex gap={2}>
					<Button colorScheme={'teal'} onClick={() => handleView(false)}>
						Change Password
					</Button>
					<Button
						variant={'outline'}
						colorScheme={'teal'}
						onClick={() => handleView(true)}
					>
						Edit Details
					</Button>
				</Flex>
			</Flex>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={isLessThan500 ? 'xs' : 'md'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Details</ModalHeader>
					{message && <AlertComponent status={status} message={message} />}
					{view ? (
						<EditDetails
							onClose={onClose}
							currentUser={currentUser}
							setCurrentUser={setCurrentUser}
							setStatus={setStatus}
							setMessage={setMessage}
						/>
					) : (
						<ChangePassword
							onClose={onClose}
							currentUser={currentUser}
							setCurrentUser={setCurrentUser}
							setStatus={setStatus}
							setMessage={setMessage}
						/>
					)}
				</ModalContent>
			</Modal>
		</Flex>
	);
}

export default Account;
