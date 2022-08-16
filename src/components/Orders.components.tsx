import {
	Button,
	Divider,
	Flex,
	Heading,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Tag,
	Text,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { OrderItemUI, OrderUI } from '../interfaces/order.interfaces';
import ordersService from '../services/orders';

function OrderItemMeta({
	imageUrl,
	name,
	id,
	status,
	updatedAt,
}: {
	imageUrl: string;
	name: string;
	id: string;
	status: string;
	updatedAt: string;
}) {
	const [isLessThan600] = useMediaQuery('(max-width: 600px)');
	return (
		<>
			<Image
				rounded='lg'
				width={isLessThan600 ? '70px' : '120px'}
				height={isLessThan600 ? '70px' : '120px'}
				fit='cover'
				src={`${process.env.PUBLIC_URL}/images/${imageUrl}`}
				alt={name}
				draggable='false'
				loading='lazy'
			/>
			<Flex
				justifyContent={'space-between'}
				direction='column'
				gap={isLessThan600 ? 1 : 2}
				flex='2'
			>
				<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
					{name}
				</Text>
				<Text fontWeight='thin' fontSize={isLessThan600 ? 'xs' : 'md'}>
					Order {id}
				</Text>
				<Tag
					width={'max-content'}
					colorScheme='teal'
					fontSize={isLessThan600 ? 'xs' : 'md'}
				>
					{status.toUpperCase()}
				</Tag>
				<Text fontWeight='medium' fontSize={isLessThan600 ? 'xs' : 'md'}>
					On {new Date(updatedAt).toDateString()}
				</Text>
			</Flex>
		</>
	);
}

function OrderItem({
	imageUrl,
	name,
	id,
	status,
	updatedAt,
	createdAt,
	address,
	total,
  type,
  qauntity
}: OrderItemUI) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLessThan600] = useMediaQuery('(max-width: 600px)');
	return (
		<Flex
			justifyContent={'space-between'}
			minW={'full'}
			gap={isLessThan600 ? '2' : '7'}
			shadow={'md'}
			p={isLessThan600 ? 2 : 3}
		>
			<OrderItemMeta
				imageUrl={imageUrl}
				name={name}
				id={id}
				status={status}
				updatedAt={updatedAt}
			/>

			<Button
				colorScheme={'teal'}
				variant={'outline'}
				size={isLessThan600 ? 'xs' : 'md'}
				onClick={onOpen}
			>
				SEE DETAILS
			</Button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={isLessThan600 ? 'xs' : 'md'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Order Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex direction={'column'} gap={3}>
							<Flex>
								<OrderItemMeta
									imageUrl={imageUrl}
									name={name}
									id={id}
									status={status}
									updatedAt={updatedAt}
								/>
							</Flex>
							<Divider />
							<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
								Placed on {new Date(createdAt).toDateString()}
							</Text>
							<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
								Total: &#8358; {total.toLocaleString()}
							</Text>
							<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
								Quantity: {qauntity}
							</Text>
							<Divider />
							<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
								Delivery Method:
							</Text>
							{type.toUpperCase()}
							<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
								Shipping Address:
							</Text>
							{address}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

function Orders() {
	const { data, isLoading, error } = useQuery('orders', fetchOrder);

	async function fetchOrder() {
		const orders = await ordersService.getMyOrders();
		return orders;
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
		<Flex direction={'column'} p={2} gap={6}>
			<Heading fontSize='2xl' fontWeight='extrabold' as={'h2'}>
				Orders
			</Heading>
			{data.map((or: OrderUI) => {
				return or.items.map((it) => {
					return (
						<OrderItem
							key={it.itemId.name}
							status={or.status || ''}
							updatedAt={or.updatedAt || ''}
							createdAt={or.createdAt || ''}
							address={or.address}
							type={or.type}
							total={or.total}
							imageUrl={it.itemId.imageUrl}
              name={it.itemId.name}
              qauntity={it.quantity}
							id={or.id || ''}
						/>
					);
				});
			})}
		</Flex>
	);
}

export default Orders;
