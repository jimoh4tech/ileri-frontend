import {
	Box,
	Flex,
	Heading,
	HStack,
	Link,
	Spinner,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartItemProps } from '../interfaces/item.interfaces';
import cartService from '../services/cart';
import CartItem from './CartItems.components';
import CartOrderSummary from './CartOrderSummary.components';
import { UserCartContext } from '../contexts/cart.contexts';
import { useQuery } from 'react-query';

function Cart() {
	const [userCart, setUserCart] = useState<CartItemProps[] | undefined>(undefined);
	const [subTotal, setSubTotal] = useState<number>(0);
	
	const { isLoading, error } = useQuery('cart', () => fetchData());
	async function fetchData() {
		const data: CartItemProps[] = await cartService.getCartItems();
		setUserCart(data);
		const total = data.reduce((p, c) => p + c.price * c.quantity, 0);
		setSubTotal(total);
	};

	useEffect(() => {
		const total = userCart?.reduce((p, c) => p + c.price * c.quantity, 0);
		setSubTotal(total || 0);
	}, [userCart])
	

	const bg = useColorModeValue('#F9F9F9', 'gray.600');
	if (isLoading)
		return (
			<Flex minH={'300px'} justifyContent='center' alignItems='center' bg={bg}>
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
		<UserCartContext.Provider value={{ userCart, setUserCart }}>
			<Box
				maxW={{ base: '3xl', lg: '7xl' }}
				mx='auto'
				p={{ base: '2', md: '4', lg: '6' }}
				bg={bg}
			>
				<Stack
					direction={{ base: 'column', lg: 'row' }}
					align={{ lg: 'flex-start' }}
					spacing={{ base: '8', md: '16' }}
				>
					<Stack spacing={{ base: '8', md: '10' }} flex='2'>
						<Heading fontSize='2xl' fontWeight='extrabold'>
							Shopping Cart ({userCart?.length} item{(userCart?.length || 0) > 1 && 's'})
						</Heading>

						<Stack spacing='6'>
							{userCart?.map((item: CartItemProps) => (
								<CartItem key={item.id} {...item} />
							))}
						</Stack>
					</Stack>

					<Flex direction='column' align='center' flex='1'>
						<CartOrderSummary subTotal={subTotal} />
						<HStack mt='6' fontWeight='semibold'>
							<p>or</p>
							<Link as={RouterLink} to='/' color={'teal.500'}>
								Continue shopping
							</Link>
						</HStack>
					</Flex>
				</Stack>
			</Box>
		</UserCartContext.Provider>
	);
}
export default Cart;
