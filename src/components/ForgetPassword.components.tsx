import {
	Box,
	Button,
	Flex,
	FormControl,
	Heading,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import { send } from '@emailjs/browser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';

function ForgetPassword() {
	const navigate = useNavigate();
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');
	const [email, setEmail] = useState('');

	async function handleSubmit() {
		try {
			const res = await authService.requestResetPassword(email);
			const data = {
				email,
				name: res.name,
				link: res.link
			};
			send('service_pu6csty', 'reset_password', data, 'W11P3bjKkWEJQess3')
			alert(`Password reset link sent to ${email}!`);
			setEmail('');
		} catch (error) {
			alert('Check your internet connection and try again!');
		}
	}
	return (
		<Flex
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
					<Heading fontSize={isLessThan500 ? '2xl' : '4xl'}>
						Forget your password?
					</Heading>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}
				>
					<Stack spacing={4}>
						<Text
							fontSize={{ base: 'sm', sm: 'md' }}
							color={useColorModeValue('gray.800', 'gray.400')}
						>
							You&apos;ll get an email with a reset link
						</Text>
						<FormControl id='email'>
							<Input
								placeholder='your-email@example.com'
								_placeholder={{ color: 'gray.500' }}
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>

						<Button
							bg={'teal.400'}
							color={'white'}
							_hover={{
								bg: 'teal.500',
							}}
							onClick={handleSubmit}
						>
							Request Reset
						</Button>
						<Stack pt={6}>
							<Text align={'center'}>
								Remember your password?{' '}
								<Link onClick={() => navigate('/signin')} color={'teal.400'}>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}

export default ForgetPassword;
