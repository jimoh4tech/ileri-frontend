import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Spinner,
	Stack,
	Text,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ItemAdmin } from '../interfaces/item.interfaces';
import productsService from '../services/products';
import AlertComponent from './AlertComponent.components';

function ProductPopOver({
	type,
	isOpen,
	onClose,
	message,
	status,
	item,
	handleSubmit,
}: {
	type: string;
	isOpen: boolean;
	onClose: any;
	message: string;
	status: 'success' | 'error' | undefined;
	item: ItemAdmin | null;
	handleSubmit: any;
}) {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{type} Product</ModalHeader>
					<ModalCloseButton />
					{message && <AlertComponent message={message} status={status} />}
					<Formik
						initialValues={{
							name: item?.name || '',
							price: item?.price || '',
							imageUrl: item?.imageUrl || '',
							category: item?.category || 'block',
						}}
						onSubmit={(values) => handleSubmit(values)}
					>
						{({ handleSubmit, isSubmitting, handleChange }) => (
							<form onSubmit={handleSubmit}>
								<ModalBody>
									<Stack spacing={4}>
										<FormControl id='firstName' isRequired>
											<FormLabel>Name</FormLabel>
											<Field as={Input} name='name' type='text' />
										</FormControl>

										<FormControl id='price' isRequired>
											<FormLabel>Price</FormLabel>
											<Field as={Input} name='price' type='number' />
										</FormControl>

										<FormControl id='category' isRequired>
											<FormLabel>Category</FormLabel>
											<Select
												name='category'
												defaultValue={item?.category || 'block'}
												onChange={handleChange}
											>
												<option value='block'>block</option>
												<option value='cement'>cement</option>
												<option value='sand'>sand</option>
												<option value='others'>others</option>
											</Select>
										</FormControl>

										<FormControl id='image' isRequired>
											<FormLabel>Image URL</FormLabel>
											<Field as={Input} name='imageUrl' type='text' />
										</FormControl>
									</Stack>
								</ModalBody>
								<ModalFooter>
									<Button
										variant={'outline'}
										colorScheme='teal'
										mr={3}
										onClick={onClose}
									>
										Cancel
									</Button>
									<Button
										colorScheme={'teal'}
										type='submit'
										isLoading={isSubmitting}
										isDisabled={isSubmitting}
									>
										Save
									</Button>
								</ModalFooter>
							</form>
						)}
					</Formik>
				</ModalContent>
			</Modal>
		</>
	);
}

function Product(itemProps: ItemAdmin) {
	const [status, setStatus] = useState<'error' | 'success' | undefined>();
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { setProducts, ...item } = itemProps;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLessThan800] = useMediaQuery('(max-width: 800px)');

	async function handleSubmit(values: any) {
		try {
			const products = await productsService.updateProduct(item.id, values);
			setProducts(products);
			setStatus('success');
			setMessage('Product successfully updated');
			setTimeout(() => {
				onClose();
				setStatus(undefined);
				setMessage('');
			}, 2000);
		} catch (error: any) {
			console.error(error);
			setStatus('error');
			const errMessage: string = error.response.data.error
				? error.response.data.error
				: error.response.data;
			setMessage(errMessage);
			setTimeout(() => {
				setStatus(undefined);
				setMessage('');
			}, 5000);
		}
	}

	async function handleToggleStockedItem() {
		try {
			setIsLoading(true);
			const products = await productsService.toggleStockedItem(item.id);
			setProducts(products);
			setIsLoading(false);
		} catch (error: any) {
			const errMessage: string = error.response.data.error
				? error.response.data.error
				: error.response.data;
			alert(errMessage);
			setIsLoading(false);
		}
	}
	async function handleDeleteItem() {
		try {
			setIsLoading(true);
			const products = await productsService.deleteItem(item.id);
			setProducts(products);
			setIsLoading(false);
		} catch (error: any) {
			const errMessage: string = error.response.data.error
				? error.response.data.error
				: error.response.data;
			alert(errMessage);
			setIsLoading(false);
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
				<Text>{item.name}</Text>
				<Text>&#8358;{item.price}</Text>
				<Text>{new Date(item.updatedAt).toDateString()}</Text>
				<Button
					colorScheme={'teal'}
					size='sm'
					maxW={'fit-content'}
					isLoading={isLoading}
					onClick={() => handleToggleStockedItem()}
				>
					{item.stocked ? 'Unstock' : 'Stock'}
				</Button>
				<Button
					onClick={onOpen}
					colorScheme={'teal'}
					size='sm'
					maxW={'fit-content'}
				>
					Edit
				</Button>
				<Button
					colorScheme={'teal'}
					size='sm'
					maxW={'fit-content'}
					isLoading={isLoading}
					onClick={() => handleDeleteItem()}
				>
					Delete
				</Button>
			</Grid>
			<ProductPopOver
				type='Edit'
				handleSubmit={handleSubmit}
				isOpen={isOpen}
				onClose={onClose}
				item={item}
				message={message}
				status={status}
			/>
		</>
	);
}

function AdminProducts() {
	const [products, setProducts] = useState<ItemAdmin[] | null>(null);
	const [status, setStatus] = useState<'error' | 'success' | undefined>();
	const [message, setMessage] = useState('');

	const { isLoading, error } = useQuery('Aproducts', () => fetchData());
	const { isOpen, onOpen, onClose } = useDisclosure();

	async function fetchData() {
		const data: ItemAdmin[] = await productsService.getAll();
		setProducts(data);
		return data;
	}

	async function handleSubmit(values: any) {
		try {
			const products = await productsService.createProduct(values);
			setProducts(products);
			setStatus('success');
			setMessage('Product successfully added');
			setTimeout(() => {
				onClose();
				setStatus(undefined);
				setMessage('');
			}, 2000);
		} catch (error: any) {
			console.error(error);
			setStatus('error');
			const errMessage: string = error.response.data.error
				? error.response.data.error
				: error.response.data;
			setMessage(errMessage);
			setTimeout(() => {
				setStatus(undefined);
				setMessage('');
			}, 5000);
		}
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
		<Stack my={10} gap='5'>
			<Button colorScheme={'teal'} maxW='200px' onClick={onOpen}>
				New Item
			</Button>
			<ProductPopOver
				type='New'
				handleSubmit={handleSubmit}
				isOpen={isOpen}
				onClose={onClose}
				item={null}
				message={message}
				status={status}
			/>
			<Flex flexDir='column' gap={2}>
				{products?.map((it) => (
					<Product key={it.name} {...it} setProducts={setProducts} />
				))}
			</Flex>
		</Stack>
	);
}

export default AdminProducts;
