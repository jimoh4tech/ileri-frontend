import {
	Button,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Spinner,
	Text,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { OrderItemAdmin, OrderUI } from '../interfaces/order.interfaces';
import ordersService from '../services/orders';
import CartProductMeta from './CartProductMeta.components';

function ViewOrder(viewOrderProps: OrderUI) {
	const {
		createdAt,
		total,
		type,
		updatedAt,
		status,
		name,
		phone,
		address,
		items,
		id,
		city,
	} = viewOrderProps;
	const [isLessThan600] = useMediaQuery('(max-width: 600px)');
	return (
		<ModalBody>
			<Flex direction={'column'} gap={4}>
				<Flex direction={'column'}>
					<Divider />
					<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
						Placed on {new Date(createdAt || '').toDateString()}
					</Text>
					<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
						{status?.toUpperCase()} on{' '}
						{new Date(updatedAt || '').toDateString()}
					</Text>
				</Flex>
				<Flex direction={'column'} gap={1}>
					<Heading fontWeight='semibold' fontSize={isLessThan600 ? 'md' : 'xl'}>
						User Info
					</Heading>
					<Divider />
					<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
						Name: {name}
					</Text>
					<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
						Phone: {phone}
					</Text>
					<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
						City: {city.toUpperCase()}
					</Text>
					<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
						Shipping Address:
					</Text>
					{address}
				</Flex>
				<Flex direction={'column'} gap={1}>
					<Heading fontWeight='semibold' fontSize={isLessThan600 ? 'md' : 'xl'}>
						Other Info
					</Heading>
					<Divider />
					<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
						Total: &#8358; {total.toLocaleString()}
					</Text>
					<Text fontWeight='medium' fontSize={isLessThan600 ? 'sm' : 'md'}>
						Delivery Method:
					</Text>
					{type.toUpperCase()}
				</Flex>
				<Heading fontWeight='semibold' fontSize={isLessThan600 ? 'md' : 'xl'}>
					Item Info
				</Heading>
				<Divider />
				{items.map((it) => (
					<CartProductMeta
						key={it.itemId.id + id}
						image={it.itemId.imageUrl}
						quantity={it.quantity}
						{...it.itemId}
					/>
				))}
			</Flex>
		</ModalBody>
	);
}

function EditOrder({
	status,
	onClose,
	handleSubmit,
}: {
	status: string;
	onClose: any;
	handleSubmit: any;
}) {
	const [orderStatus, setOrderStatus] = useState(status);

	function handleOnChange(e: any) {
		setOrderStatus(e.target.value);
	}
	return (
		<form onSubmit={(e) => handleSubmit(e, orderStatus)}>
			<ModalBody>
				<FormControl id='status' isRequired>
					<FormLabel>Order status</FormLabel>
					<Select name='status' defaultValue={status} onChange={handleOnChange}>
						<option value='confirmed'>Confirmed</option>
						<option value='shipped'>Shipped</option>
						<option value='delivered'>Delivered</option>
					</Select>
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

function Order(orderProps: OrderItemAdmin) {
	const [view, setView] = useState(true);
	const { setOrders, ...order } = orderProps;

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLessThan800] = useMediaQuery('(max-width: 800px)');

	function handleView(view: boolean) {
		setView(view);
		onOpen();
	}

	async function handleSubmit(e: any, status: string) {
		e.preventDefault();
		try {
			const orders = await ordersService.updateOrderStatus(
				order.id || '',
				status
			);
			setOrders(orders);
			onClose();
			alert('Order status successfully Updated');
		} catch (error: any) {
			alert(`Error updating status ${error.message}`);
		}
	}

	return (
		<>
			<Grid
				border='1px'
				borderRadius={'lg'}
				gap='2'
				p='2'
				templateColumns={isLessThan800 ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)'}
				alignItems='center'
			>
				<Text fontSize={isLessThan800 ? 'sm' : 'md'}>{order.name}</Text>
				<Text fontSize={isLessThan800 ? 'sm' : 'md'}>
					{order.status?.toUpperCase()}
				</Text>
				<Text fontSize={isLessThan800 ? 'sm' : 'md'}>
					{new Date(order.createdAt || '').toDateString()}
				</Text>
				<Text fontSize={isLessThan800 ? 'sm' : 'md'}>
					&#8358; {order.total.toLocaleString()}
				</Text>
				<Button
					onClick={() => handleView(true)}
					colorScheme={'teal'}
					size={isLessThan800 ? 'xs' : 'sm'}
					maxW={'fit-content'}
				>
					View
				</Button>
				<Button
					onClick={() => handleView(false)}
					colorScheme={'teal'}
					size={isLessThan800 ? 'xs' : 'sm'}
					maxW={'fit-content'}
				>
					Edit
				</Button>
			</Grid>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={isLessThan800 ? 'sm' : 'md'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Order Info</ModalHeader>
					<ModalCloseButton />
					{view ? (
						<ViewOrder {...order} />
					) : (
						<EditOrder
							onClose={onClose}
							status={order.status || ''}
							handleSubmit={handleSubmit}
						/>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

function AdminOrders() {
	const [orders, setOrders] = useState<OrderUI[] | null>(null);

	const { isLoading, error } = useQuery('orders', () => fetchData());

	async function fetchData() {
		const data: OrderUI[] = await ordersService.getAllOrders();
		const reverse = [...data].reverse();
		setOrders(reverse);
		return reverse;
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
		<Flex flexDir='column' gap={2} my='30px'>
			{orders?.map((or: OrderUI) => (
				<Order key={or.id} setOrders={setOrders} {...or} />
			))}
		</Flex>
	);
}

export default AdminOrders;
