import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/user.contexts';
import AuthService from '../services/auth';
import AlertComponent from './AlertComponent.components';

function SignIn() {
	const [status, setStatus] = useState<'error' | 'success'>();
	const [message, setMessage] = useState('');

	const navigate = useNavigate();
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');

	const { setCurrentUser } = useContext(CurrentUserContext);

	async function handleLogin(values: any) {
		try {
			const userObj = await AuthService.login(values);
			setCurrentUser(userObj);
			AuthService.setToken(userObj.token);
			setStatus('success');
			setMessage(`Welcome back`);
			if (window.location.pathname.includes('sign'))
				navigate('/');
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
			minH={'40vh'}
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
						Sign in to your account
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to continue <Link color={'teal.400'}>shopping</Link> ✌️
					</Text>
				</Stack>
				{message && <AlertComponent message={message} status={status} />}
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={isLessThan500 ? 3 : 8}
				>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						onSubmit={(values) => handleLogin(values)}
					>
						{({ handleSubmit, errors, touched, isSubmitting }) => (
							<form onSubmit={handleSubmit}>
								<Stack spacing={4}>
									<FormControl id='email'>
										<FormLabel htmlFor='email'>Email address</FormLabel>
										<Field as={Input} type='email' name='email' />
									</FormControl>
									<FormControl
										isInvalid={!!errors.password && touched.password}
									>
										<FormLabel htmlFor='password'>Password</FormLabel>
										<Field
											as={Input}
											type='password'
											name='password'
											validate={(value: string) => {
												let error;

												if (value.length < 6) {
													error = 'Password must contain at least 6 characters';
												}

												return error;
											}}
										/>
										<FormErrorMessage>{errors.password}</FormErrorMessage>
									</FormControl>
									<Stack spacing={10}>
										<Stack
											direction='row'
											align={'start'}
											justify={'space-between'}
										>
											<Checkbox
												size={isLessThan500 ? 'sm' : 'md'}
												colorScheme={'teal'}
											>
												Remember me
											</Checkbox>
											<Link
												onClick={() => navigate('/reset')}
												color={'teal.400'}
												fontSize={isLessThan500 ? 'sm' : 'md'}
											>
												Forgot password?
											</Link>
										</Stack>
										<Button
											type='submit'
											colorScheme={'teal'}
											isLoading={isSubmitting}
											isDisabled={isSubmitting}
										>
											Sign in
										</Button>
										<Stack mt={3}>
											<Text align={'center'}>
												Don't have an account?{' '}
												<Link
													onClick={() => navigate('/signup')}
													color={'teal.400'}
												>
													Sign Up
												</Link>
											</Text>
										</Stack>
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

export default SignIn;
