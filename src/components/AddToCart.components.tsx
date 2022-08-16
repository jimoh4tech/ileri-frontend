import {
	Box,
	Button,
	Flex,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import { CurrentUserContext } from '../contexts/user.contexts';
import { NewCartItem } from '../interfaces/cart.interfaces';
import { ItemCart } from '../interfaces/item.interfaces';
import cartServices from '../services/cart';

function AddToCart({ onClose, isOpen, ...item }: ItemCart) {
	const [quantity, setQuantity] = useState(1);
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	async function handleSubmit(e: any) {
		e.preventDefault();
		try {
			
			const itemToAdd: NewCartItem = {
				itemId: item.id,
				quantity,
			};
			const cart = await cartServices.addItemToCart(itemToAdd);
			const userObj = {
				...currentUser,
				cart: cart.items.length,
				message: 'Product successfully added',
				status: 'success'
			};
			setCurrentUser(userObj);
			onClose();
	
			setTimeout(() => {
				const userObj = {
					...currentUser,
					cart: cart.items.length,
					message: '',
					status: '',
				};
				setCurrentUser(userObj);
			}, 5000)
		} catch (error) {
			
		}
	}
	return (
		<>
			<Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent maxH={'full'}>
					<ModalHeader>Add To Cart</ModalHeader>
					<ModalCloseButton />
					<ModalBody display={'flex'} justifyContent='center'>
						<form onSubmit={handleSubmit}>
							<Stack spacing={3} mb={4}>
								<Image
									src={`${process.env.PUBLIC_URL}/images/${item.imageUrl}`}
									alt={'name'}
									alignSelf='center'
									w='full'
									maxW={'150px'}
									mb={5}
								/>
								<Flex justifyContent={'space-between'}>
									<Box
										fontWeight='semibold'
										fontSize={'xl'}
										as='h4'
										lineHeight={'tight'}
										color={useColorModeValue('black', 'white')}
									>
										{item.name}
									</Box>
									<Text
										fontWeight={800}
										fontSize={'xl'}
										color={useColorModeValue('black', 'white')}
									>
										<span>&#8358;</span>
										{(quantity * item.price).toLocaleString()}
									</Text>
								</Flex>
								<InputGroup>
									<InputLeftElement
										color={'teal'}
										onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
										as={AiFillMinusSquare}
									/>
									<Input
										type={'number'}
										value={quantity}
										min='1'
										textAlign={'center'}
										fontWeight={'bold'}
										onChange={(e) => setQuantity(Number(e.target.value))}
									/>
									<InputRightElement
										color={'teal'}
										onClick={() => setQuantity(quantity + 1)}
										as={AiFillPlusSquare}
									/>
								</InputGroup>
								<Button type='submit' colorScheme='teal'>
									ADD TO CART
								</Button>
							</Stack>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default AddToCart;
