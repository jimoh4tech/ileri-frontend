import {
	Box,
	Flex,
	Image,
	Stack,
	Text,
	useColorModeValue as mode,
} from '@chakra-ui/react';

export interface CartProductMetaProps {
	name: string;
	category: string;
	image: string;
	quantity?: number;
	price?: number;
}

export function CartProductMeta(props: CartProductMetaProps) {
	const { image, name, category, quantity, price } = props;
	return (
		<Stack direction='row' spacing='5' width='full'>
			<Image
				rounded='lg'
				width='120px'
				height='120px'
				fit='cover'
				src={`${process.env.PUBLIC_URL}/images/${image}`}
				alt={name}
				draggable='false'
				loading='lazy'
			/>
			<Box pt='4' width={'full'}>
				<Stack spacing='1'>
					<Flex justifyContent={'space-between'}>
						<Text fontWeight='medium'>{name}</Text>
						{price && (
							<Text fontWeight='medium'>
								&#8358; {Number(price).toLocaleString()}
							</Text>
						)}
					</Flex>
					<Text color={mode('gray.600', 'gray.400')} fontSize='sm'>
						{category.toUpperCase()}
					</Text>
					{quantity && (
						<Text fontSize={'smaller'} fontWeight='semibold'>
							Quantity: {quantity}
						</Text>
					)}
				</Stack>
			</Box>
		</Stack>
	);
}

export default CartProductMeta;
