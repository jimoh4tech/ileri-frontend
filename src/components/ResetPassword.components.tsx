import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import authService from '../services/auth';


function ResetPassword() {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [searchParams] = useSearchParams();

	const [isLessThan500] = useMediaQuery('(max-width: 500px)');

	const navigate = useNavigate();

	async function handleSubmit(e:any) {
		try {
			e.preventDefault();
			const token = searchParams.get('token') || '';
			const userId = searchParams.get('id') || '';
			
			await authService.resetPassword(userId, token, newPassword);
			alert('Password reset successful! Continue to signin.');
			setTimeout(() => navigate('/signin'), 2000);
		} catch (error: any) {
			alert('Error reseting password! Retry reset link.');
		}
	}
	return (
		<Flex
			minH={'50vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack
				spacing={8}
				mx={'auto'}
				maxW={'lg'}
				pt={8}
				px={isLessThan500 ? 2 : 6}
			>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Change Password</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={isLessThan500 ? 4 : 8}
				>
					<form onSubmit={handleSubmit}>
						<Stack>
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
												setShowNewPassword(
													(showNewPassword) => !showNewPassword
												)
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

							<Button
								colorScheme={'teal'}
								type='submit'
								disabled={
									newPassword.length < 6 || newPassword !== confirmPassword
								}
							>
								Change Password
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
}

export default ResetPassword;
