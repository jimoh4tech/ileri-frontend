import { Flex, Grid, Spinner, Text, useMediaQuery } from '@chakra-ui/react';
import { Item } from '../interfaces/item.interfaces';
import productsService from '../services/products';
import Product from './Product.components';
import { useQuery } from 'react-query';
function Products({ filterText }: { filterText: string }) {
	
	const { data: products, isLoading, error } = useQuery('products', () =>
	productsService.getAll()
	);

	const [isLessThan600] = useMediaQuery('(max-width: 600px)');
	const [isLessThan850] = useMediaQuery('(max-width: 850px)');
	const col = !isLessThan850
		? 'repeat(4,1fr)'
		: isLessThan600
		? 'repeat(2,1fr)'
		: 'repeat(3,1fr)';
	const gap = isLessThan600 ? '1' : '3';

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
				<Text fontWeight={'medium'}>Network Error. Check your internet connection and reload the page</Text>
			</Flex>
		);
	return (
		<>
			<Grid gap={gap} my='30px' templateColumns={col}>
				{products.map((item: Item) => {
					if (
						(item.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 &&
							item.category.toLowerCase().indexOf(filterText.toLowerCase()) ===
								-1) ||
						!item.stocked
					) {
						return null;
					} else {
						return (
							<Product filterText={filterText} key={item.name} {...item} />
						);
					}
				})}
			</Grid>
		</>
	);
}

export default Products;
