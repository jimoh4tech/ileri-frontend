import {
	Badge,
	Box,
	Circle,
	Flex,
	Icon,
	Image,
	Stack,
	Text,
	Tooltip,
	useColorModeValue,
	useDisclosure,
	useMediaQuery,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/user.contexts';
import { ItemFilter, RatingProps } from '../interfaces/item.interfaces';
import AddToCart from './AddToCart.components';

function Rating({ rating, numReviews }: RatingProps) {
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');
	return (
		<Box display={'flex'} alignItems='center'>
			{Array(5)
				.fill('')
				.map((_, i) => {
					const roundedRating = Math.round(rating * 2) / 2;
					if (roundedRating - i >= 1) {
						return (
							<BsStarFill key={i} style={{ marginLeft: '1' }} color={'teal'} />
						);
					}
					if (roundedRating - i === 0.5)
						return (
							<BsStarHalf key={i} style={{ marginLeft: '1' }} color='teal' />
						);
					return <BsStar key={i} style={{ marginLeft: '1' }} />;
				})}
			<Box
				as='span'
				ml={'2'}
				fontSize={isLessThan500 ? '8px' : 'small'}
				color={useColorModeValue('gray.600', 'white')}
			>
				{numReviews} review{numReviews > 1 && 's'}
			</Box>
		</Box>
	);
}

function Product(itemFilter: ItemFilter) {
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');
	const { filterText, ...item } = itemFilter;
	const { currentUser } = useContext(CurrentUserContext);
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();

	function handleAddToCart() {
		if (currentUser) {
			onOpen();
		} else {
			navigate('/signin');
		}
	}
	return (
		<>
			<Flex
				direction={'column'}
				bg={useColorModeValue('white', 'gray.600')}
				rounded='lg'
				shadow={'lg'}
				p='2'
				justifyContent={'space-between'}
				gap='1'
			>
				<Box
					position='relative'
					minH={isLessThan500 ? '100px' : '250px'}
				>
					<Circle
						size={isLessThan500 ? '25px' : '40px'}
						position='absolute'
						top={isLessThan500 ? 0.7 : 2}
						right={isLessThan500 ? 0.7 : 2}
						bg='teal.200'
						color={'teal'}
						fontSize={isLessThan500 ? '10px' : 'medium'}
					>{`-${Math.trunc(item.discount * 100)}%`}</Circle>

					<Image
						src={`${process.env.PUBLIC_URL}/images/${item.imageUrl}`}
						alt={item.name}
						alignSelf='center'
						w='full'
						maxH={isLessThan500 ? '150px' : '320px'}
					/>
				</Box>
				<Flex direction={'column'} gap='1' px={'2'}>
					<Box display={'flex'} alignItems='baseline'>
						<Badge rounded='full' px='2' fontSize='0.8em' colorScheme='teal'>
							{item.category}
						</Badge>
					</Box>
					<Flex mt={'1'} justifyContent='space-between' alignContent={'center'}>
						<Box
							fontSize={isLessThan500 ? 'medium' : 'xl'}
							fontWeight='semibold'
							as='h4'
							lineHeight={'tight'}
							color={useColorModeValue('black', 'white')}
						>
							{item.name}
						</Box>
						<Tooltip
							label='Add to cart'
							placement='top'
							color={'teal'}
							bg='teal.200'
							fontSize={isLessThan500 ? '0.7em' : '1.2em'}
							hasArrow
						>
							<Box onClick={() => handleAddToCart()}>
								<Icon
									as={FaCartPlus}
									h={7}
									w={7}
									alignSelf='center'
									fill={'teal'}
								/>
							</Box>
						</Tooltip>
						<AddToCart isOpen={isOpen} onClose={onClose} {...item} />
					</Flex>
					<Stack direction={'row'} align={'center'}>
						<Text
							fontWeight={800}
							fontSize={isLessThan500 ? 'medium' : 'xl'}
							color={useColorModeValue('black', 'white')}
						>
							<span>&#8358;</span>
							{item.price.toLocaleString()}
						</Text>
						<Text
							textDecoration={'line-through'}
							color={useColorModeValue('gray.600', 'whiteAlpha.800')}
							fontSize={isLessThan500 ? 'small' : 'large'}
						>
							<span>&#8358;</span>
							{Number(item.price * item.discount + item.price).toLocaleString()}
						</Text>
					</Stack>
					<Rating {...item.reviews} />
				</Flex>
			</Flex>
		</>
	);
}

export default Product;
