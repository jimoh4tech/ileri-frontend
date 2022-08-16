import { Button, CloseButton, Flex, Link, Text } from '@chakra-ui/react';
import CartProductMeta from './CartProductMeta.components';
import { useContext, useState } from 'react';
import { CartItemProps } from '../interfaces/item.interfaces';
import { UserCartContext } from '../contexts/cart.contexts';
import cartService from '../services/cart';
import { CurrentUserContext } from '../contexts/user.contexts';

function QuantitySelect ({
	value,
	itemId,
	setUserCart,
	alertTimeout,
}: {
	value: number;
	itemId: string;
	setUserCart: any;
	alertTimeout: any;
}) {
	const [isLoading, setIsLoading] = useState(false);

	async function increaseCartItem() {
		setIsLoading(true);
		const cart = await cartService.updateCartItems(itemId, 1);
		setUserCart(cart);
		alertTimeout('success', 'Product added sucessfully');
		setIsLoading(false);
	}
	async function decreaseCartItem() {
		setIsLoading(true);
		const cart = await cartService.updateCartItems(itemId, -1);
		setUserCart(cart);
		alertTimeout('success', 'Item quantity has been updated');
		setIsLoading(false);
	}
	return (
		<Flex justifyContent={'space-between'} alignItems='center' minW={'160px'}>
			<Button
				colorScheme='teal'
				isDisabled={value === 1}
				shadow='lg'
				isLoading={isLoading}
				onClick={() => decreaseCartItem()}
			>
				&#9866;
			</Button>
			<Text fontWeight={'bold'}>{value}</Text>
			<Button
				isLoading={isLoading}
				shadow='lg'
				colorScheme='teal'
				onClick={() => increaseCartItem()}
			>
				&#10011;
			</Button>
		</Flex>
	);
};

function CartItem (props: CartItemProps) {
	const { name, category, quantity, imageUrl, price, id } = props;

	const { setUserCart } = useContext(UserCartContext);
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	async function removeCartItem() {
		const cart = await cartService.removeCartItems(id);
		setUserCart(cart);
		alertTimeout('success', 'Product removed sucessfully');
	}

	function alertTimeout(status: string, message: string) {
		const userObj = {
			...currentUser,
			status,
			message,
		};
		setCurrentUser(userObj);

		setTimeout(() => {
			const newObj = {
				...currentUser,
				status: '',
				message: '',
			};
			setCurrentUser(newObj);
		}, 2000);
	}

	return (
		<Flex
			direction={{ base: 'column', md: 'row' }}
			justify='space-between'
			align='center'
		>
			<CartProductMeta name={name} category={category} image={imageUrl} />

			{/* Desktop */}
			<Flex
				width='full'
				justify='space-between'
				display={{ base: 'none', md: 'flex' }}
			>
				<QuantitySelect
					value={quantity}
					setUserCart={setUserCart}
					itemId={id}
					alertTimeout={alertTimeout}
				/>
				<Text fontWeight={'bold'}>&#8358;{Number(price).toLocaleString()}</Text>
				<CloseButton
					aria-label={`Delete ${name} from cart`}
					onClick={() => removeCartItem()}
				/>
			</Flex>

			{/* Mobile */}
			<Flex
				mt='4'
				align='center'
				width='full'
				justify='space-between'
				display={{ base: 'flex', md: 'none' }}
			>
				<Link
					fontSize='sm'
					textDecor='underline'
					onClick={() => removeCartItem()}
				>
					Delete
				</Link>
				<QuantitySelect
					value={quantity}
					setUserCart={setUserCart}
					itemId={id}
					alertTimeout={alertTimeout}
				/>
				<Text fontWeight={'bold'}>&#8358;{Number(price).toLocaleString()}</Text>
			</Flex>
		</Flex>
	);
};

export default CartItem;