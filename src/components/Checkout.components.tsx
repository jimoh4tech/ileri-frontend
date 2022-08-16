import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputLeftAddon,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { usePaystackPayment } from 'react-paystack';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/user.contexts';
import { CartItemProps } from '../interfaces/item.interfaces';
import cartService from '../services/cart';
import ordersService from '../services/orders';
import CheckoutOrderSummary from './CheckoutOrderSummary.components';

const opt: any = {
	Iba: [10, 30, 100],
	Epe: [20, 50, 120],
	Agege: [30, 70, 150],
	surelere: [40, 100, 200],
};

function Options() {
	return (
		<>
			{Object.keys(opt).map((label) => (
				<option key={label} value={label}>
					{' '}
					{label}
				</option>
			))}
		</>
	);
}

function Checkout() {
	const [subTotal, setSubToal] = useState(0);
	const [deliveryFee, setDeliveryFee] = useState(0);
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const [orderDetails, setOrderDetails] = useState({
		name: currentUser?.name,
		address: '',
		city: 'Iba',
		phone: currentUser?.phone,
		user: currentUser?.id,
		type: 'standard',
	});

	const {
		data: userCart,
		isLoading,
		error,
	} = useQuery('orderItem', () => fetchData());

	const navigate = useNavigate();

	const reference = new Date().getTime().toString();

	const config = {
		email: 'olamide14044@gmail.com',
		amount: (subTotal + deliveryFee) * 100,
		publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || '',
	};

	const initializePayment = usePaystackPayment({ ...config, reference });

	async function createOrder() {
		const total = subTotal + deliveryFee;
		await ordersService.createOrder({
			...orderDetails,
			total,
			paymentRef: reference,
			items: []
		});
		alert('Thanks for patronizing us! We will contact you soon!!');
		navigate('/');
		setCurrentUser({ ...currentUser, cart: 0 });
	}
	const onSuccess = () => createOrder();

	const onClose = () => {
		console.log('Closed');
		alert('Need help to complete your order? kindly contact us.');
	};
	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			initializePayment(onSuccess, onClose);
		} catch (error) {
			console.error(error);
			alert('Transaction failed! Check your internet connection.');
		}
	}

	function handleChange(e: any) {
		const name = e.target.name;
		const value = e.target.value;
		setOrderDetails({
			...orderDetails,
			[name]: value,
		});
	}

	async function fetchData() {
		const data: CartItemProps[] = await cartService.getCartItems();
		const total = data.reduce((p, c) => p + c.price * c.quantity, 0);
		setSubToal(total);
		return data;
	}
	useEffect(() => {
		if (orderDetails.type === 'pickup') {
			setDeliveryFee(0);
		} else {
			const dFee =
				userCart?.reduce(
					(p, c) =>
						p + c.quantity * opt[orderDetails.city][c.deliveryValue - 1],
					0
				) || 0;
			setDeliveryFee(dFee);
		}
	}, [orderDetails.city, orderDetails.type, userCart]);

	return (
		<Box
			maxW={{ base: '3xl', lg: '7xl' }}
			mx='auto'
			p={{ base: '2', md: '4', lg: '6' }}
			bg={useColorModeValue('#F9F9F9', 'gray.600')}
		>
			<form onSubmit={handleSubmit}>
				<Stack
					direction={{ base: 'column', lg: 'row' }}
					align={{ lg: 'flex-start' }}
					spacing={{ base: '8', md: '16' }}
				>
					<Flex direction={'column'} gap={6} flex='2'>
						<Flex direction={'column'} gap={10}>
							<Stack>
								<Heading size={'md'}>Shipping Information</Heading>
								<Stack gap={4}>
									<FormControl isRequired>
										<FormLabel>Full name</FormLabel>
										<Input
											type='text'
											name='name'
											placeholder='Your first and last name'
											value={orderDetails.name}
											onChange={handleChange}
										/>
									</FormControl>
									<FormControl isRequired>
										<FormLabel>Street address</FormLabel>
										<Input
											type='text'
											name='address'
											placeholder='123 Example Street'
											value={orderDetails.address}
											onChange={handleChange}
										/>
									</FormControl>
									<FormControl isRequired>
										<FormLabel>City</FormLabel>
										<Select
											name='city'
											value={orderDetails.city}
											onChange={handleChange}
										>
											<Options />
										</Select>
									</FormControl>
									<FormControl isRequired>
										<FormLabel>Phone number</FormLabel>
										<InputGroup>
											<InputLeftAddon children='+234' />
											<Input
												name='phone'
												type='tel'
												placeholder='80 1234 5678'
												value={orderDetails.phone}
												onChange={handleChange}
											/>
										</InputGroup>
									</FormControl>
								</Stack>
							</Stack>
							<Stack>
								<Heading size={'md'}>Shipping Information</Heading>
								<RadioGroup defaultValue={'standard'}>
									<Stack spacing={5} direction={{ base: 'column', lg: 'row' }}>
										<Radio
											colorScheme={'teal'}
											value='standard'
											name='type'
											onChange={handleChange}
										>
											<Text fontWeight={'medium'}>Standard Shipping</Text>
											<Text>Dispatched in 24 hours</Text>
										</Radio>
										<Radio
											colorScheme={'teal'}
											value='pickup'
											name='type'
											onChange={handleChange}
										>
											<Text fontWeight={'medium'}>Pick Up @ Store</Text>
											<Text>Select a close store</Text>
										</Radio>
									</Stack>
								</RadioGroup>
							</Stack>
						</Flex>
					</Flex>
					<Flex
						direction='column'
						align='center'
						flex='1'
						borderWidth='2px'
						rounded='lg'
						padding='8'
					>
						<CheckoutOrderSummary
							subTotal={subTotal}
							deliveryFee={deliveryFee}
							userCart={userCart}
							isLoading={isLoading}
							error={error}
						/>
						<HStack mt='6' fontWeight='thin'>
							<p>Need help to complete your order?</p>
						</HStack>
						<Stack direction='row' spacing={4} mt={3}>
							<Button
								leftIcon={<IoIosMail />}
								colorScheme='teal'
								variant='solid'
							>
								Email
							</Button>
							<Button
								rightIcon={<FaArrowRight />}
								colorScheme='teal'
								variant='outline'
							>
								Call us
							</Button>
						</Stack>
					</Flex>
				</Stack>
			</form>
		</Box>
	);
}

export default Checkout;
