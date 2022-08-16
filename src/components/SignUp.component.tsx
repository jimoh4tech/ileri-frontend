import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useContext, useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/user.contexts';
import AuthService from '../services/auth';
import AlertComponent from './AlertComponent.components';

function SignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [status, setStatus] = useState<'error' | 'success'>();
	const [message, setMessage] = useState('');

	const [isLessThan500] = useMediaQuery('(max-width: 500px)');

	const navigate = useNavigate();
	const { setCurrentUser } = useContext(CurrentUserContext);

	async function handleSubmit(values: any) {
		try {
			const user = await AuthService.register(values);
			AuthService.setToken(user.token);
			setCurrentUser(user);
			setStatus('success');
			setMessage('Your registration was successful');
			setTimeout(() => navigate('/'), 2000);
		} catch (error: any) {
			console.error(error);
			setStatus('error');
			const errMessage: string =
				error.message === 'Network Error'
					? 'Network Error. Check your internet connection'
					: error.response.data.error
					? error.response.data.error
					: error.response.data;
			setMessage(errMessage);
		}
	}

	return (
		<Flex
			minH={'50vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} pt={8} px={isLessThan500 ? 2 : 6}>
				<Stack align={'center'}>
					<Heading fontSize={'4xl'}>Sign up</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to continue <Link color={'teal.400'}>shopping</Link> ✌️
					</Text>
				</Stack>
				{message && <AlertComponent message={message} status={status} />}
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={isLessThan500 ? 4: 8}
				>
					<Formik
						initialValues={{
							name: '',
							phone: '',
							email: '',
							password: '',
						}}
						onSubmit={(values) => handleSubmit(values)}
					>
						{({ handleSubmit, errors, touched, isSubmitting }) => (
							<form onSubmit={handleSubmit}>
								<Stack spacing={4}>
									<FormControl id='name' isRequired>
										<FormLabel>Name</FormLabel>
										<Field as={Input} name='name' type='text' />
									</FormControl>

									<FormControl id='phone' isRequired>
										<FormLabel>Phone Number</FormLabel>
										<InputGroup>
											<InputLeftAddon children='+234' />
											<Field as={Input} name='phone' type='tel' />
										</InputGroup>
									</FormControl>

									<FormControl id='email' isRequired>
										<FormLabel>Email address</FormLabel>
										<Field as={Input} name='email' type='email' />
									</FormControl>

									<FormControl
										isInvalid={!!errors.password && touched.password}
										isRequired
									>
										<FormLabel>Password</FormLabel>
										<InputGroup>
											<Field
												as={Input}
												type={showPassword ? 'text' : 'password'}
												name='password'
												validate={(value: string) => {
													let error;

													if (value.length < 6) {
														error =
															'Password must contain at least 6 characters';
													}

													return error;
												}}
											/>
											<InputRightElement h={'full'}>
												<Box
													onClick={() =>
														setShowPassword((showPassword) => !showPassword)
													}
												>
													{showPassword ? (
														<BsEyeFill width={'10px'} />
													) : (
														<BsEyeSlashFill />
													)}
												</Box>
											</InputRightElement>
										</InputGroup>
										<FormErrorMessage>{errors.password}</FormErrorMessage>
									</FormControl>

									<Stack spacing={10} pt={2}>
										<Button
											colorScheme={'teal'}
											type='submit'
											isLoading={isSubmitting}
											isDisabled={isSubmitting}
										>
											Sign up
										</Button>
									</Stack>
									<Stack pt={6}>
										<Text align={'center'}>
											Already a user?{' '}
											<Link
												onClick={() => navigate('/signin')}
												color={'teal.400'}
											>
												Login
											</Link>
										</Text>
									</Stack>
								</Stack>
							</form>
						)}
					</Formik>
				</Box>
			</Stack>
		</Flex>
	);
}

export default SignUp;
