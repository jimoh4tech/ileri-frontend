import {
	Button,
	Checkbox,
	Flex,
	Heading,
	Spinner,
	Stack,
	Text,
	Link,
	useColorModeValue,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import CartProductMeta from './CartProductMeta.components';
import { CartItemProps } from '../interfaces/item.interfaces';
import { useState } from 'react';
import { Link  as RouterLink} from 'react-router-dom';

type OrderSummaryItemProps = {
	label: string;
	value: number;
	sign?: string;
};
function OrderSummaryItem(props: OrderSummaryItemProps) {
	const { label, value, sign } = props;
	return (
		<Flex justify='space-between' fontSize='md' fontWeight='medium'>
			<Text color={useColorModeValue('gray.600', 'gray.400')}>{label}</Text>
			<Text color={sign === '-' ? 'teal' : ''}>
				{sign} &#8358; {Number(value).toLocaleString()}
			</Text>
		</Flex>
	);
}

function CheckoutOrderSummary({
	subTotal,
	deliveryFee,
	userCart,
	isLoading,
	error,
}: {
	subTotal: number;
	deliveryFee: number;
	userCart: CartItemProps[] | undefined;
	isLoading: boolean;
	error: any;
}) {
	const [isChecked, setIsChecked] = useState(false);

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
		<Stack spacing='8' width='full'>
			<Heading size='md'>Order Summary</Heading>

			{userCart
				?.filter((it) => it.stocked)
				.map((it) => {
					return (
						<CartProductMeta
							key={it.name}
							category={it.category}
							image={it.imageUrl}
							name={it.name}
							quantity={it.quantity}
							price={it.price}
						/>
					);
				})}
			<Stack spacing='10'>
				<Stack spacing={4}>
					<OrderSummaryItem label='Subtotal' value={subTotal} />
					<OrderSummaryItem label='Delivery fee' value={deliveryFee} sign='+' />
					<OrderSummaryItem label='Discount' value={0} sign='-' />
				</Stack>

				<Flex justify='space-between' mt={6}>
					<Text fontSize='lg' fontWeight='semibold'>
						Order Total
					</Text>
					<Text fontSize='xl' fontWeight='extrabold'>
						&#8358; {Number(subTotal + deliveryFee).toLocaleString()}
					</Text>
				</Flex>
			</Stack>
			<Checkbox
				colorScheme={'teal'}
				isChecked={isChecked}
				onChange={() => setIsChecked(!isChecked)}
			>
				{' '}
				<Text fontSize={'sm'}>
					I agree with the{' '}
					<Link color={'teal'} as={RouterLink} to={'terms-and-conditions'}>
						Terms and Conditions
					</Link>{' '}
					and{' '}
					<Link color={'teal'} as={RouterLink} to={'return-policy'}>
						Return &amp; Refund Policy
					</Link>
				</Text>
			</Checkbox>
			<Button
				colorScheme='teal'
				size='lg'
				fontSize='md'
				rightIcon={<FaArrowRight />}
				type='submit'
				isDisabled={!isChecked}
			>
				Pay Now
			</Button>
		</Stack>
	);
}

export default CheckoutOrderSummary;
