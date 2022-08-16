import {
	Button,
	Flex,
	Heading,
	Stack,
	Text,
	useColorModeValue as mode,
} from '@chakra-ui/react';
import { useNavigate} from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';


function CartOrderSummary ({ subTotal }: { subTotal: number }) {
	const navigate = useNavigate();
	return (
		<Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' width='full'>
			<Heading size='md'>Order Summary</Heading>

			<Stack spacing='6'>
				<Flex justify='space-between'>
					<Text fontSize='lg' fontWeight='semibold'>
						Subtotal
					</Text>
					<Text fontSize='xl' fontWeight='extrabold'>
						&#8358;{Number(subTotal).toLocaleString()}
					</Text>
				</Flex>
				<Text fontWeight='medium' color={mode('gray.600', 'gray.400')} fontSize='sm'>
					Delivery fees not included.
				</Text>
			</Stack>
			<Button
				colorScheme='teal'
				size='lg'
				fontSize='md'
				rightIcon={<FaArrowRight />}
				onClick={() => navigate('/checkout')}
			>
				Checkout
			</Button>
		</Stack>
	);
};

export default CartOrderSummary;