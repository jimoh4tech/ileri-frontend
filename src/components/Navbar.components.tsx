import {
	Box,
	Button,
	Circle,
	Flex,
	Image,
	Input,
	InputGroup,
	InputRightAddon,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Spacer,
	useColorMode,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { BsMoon, BsSun, BsPerson, BsCart3, BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/user.contexts';
import logo from '../logo.png';

function Search({
	display,
	filterText,
	onFilterTextChange,
	width,
	navigate,
}: {
	display: string;
	filterText: string;
	onFilterTextChange: any;
	width: string;
	navigate: any;
}) {
	return (
		<>
			<InputGroup display={display} cursor='pointer' width={width}>
				<Input
					value={filterText}
					placeholder='Search products'
					maxW={'500px'}
					onChange={(e) => onFilterTextChange(e.target.value)}
				/>
				<InputRightAddon bg={'teal'}>
					<BsSearch fill='white' onClick={() => navigate('/')} />
				</InputRightAddon>
			</InputGroup>
		</>
	);
}

function Navbar({
	filterText,
	onFilterTextChange,
}: {
	filterText: string;
	onFilterTextChange: any;
}) {
	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
	const navigate = useNavigate();
	const bg = useColorModeValue('white', 'gray.600');
	const { colorMode, toggleColorMode } = useColorMode();
	const [isLessThan800] = useMediaQuery('(max-width: 800px)');

	function handlelogout() {
		if (currentUser) {
			setCurrentUser(null);
			navigate('/');
		} else {
			navigate('/signin');
		}
	}

	return (
		<>
			<Box bg={bg} p='10px'>
				<Flex gap={'2'} flexDir={'column'}>
					<Flex alignItems={'center'} gap={isLessThan800 ? '2' : '5'}>
						<Link to='/'>
							<Box maxW={'300px'}>
								<Image src={logo} alt='logo' />
							</Box>
						</Link>
						<Spacer />
						<Search
							filterText={filterText}
							onFilterTextChange={onFilterTextChange}
							display={isLessThan800 ? 'none' : 'flex'}
							width={'52%'}
							navigate={navigate}
						/>
						<Flex alignItems={'center'}>
							<Button
								onClick={toggleColorMode}
								bg={useColorModeValue('white', 'gray.600')}
							>
								{colorMode === 'light' ? <BsMoon /> : <BsSun />}
							</Button>

							<Menu>
								<MenuButton
									as={Button}
									cursor='pointer'
									bg={useColorModeValue('white', 'gray.600')}
								>
									<BsPerson fill={useColorModeValue('gray.800', 'white')} />
								</MenuButton>
								<MenuList alignItems={'center'}>
									<MenuItem
										isDisabled={currentUser ? false : true}
										onClick={() => navigate('account')}
									>
										My Account
									</MenuItem>
									<MenuItem
										isDisabled={currentUser ? false : true}
										onClick={() => navigate('orders')}
									>
										Orders
									</MenuItem>
									<MenuDivider />
									<MenuItem
										as={Button}
										onClick={() => handlelogout()}
										margin='auto'
										w={'80%'}
									>
										{currentUser ? 'Logout' : 'Login'}
									</MenuItem>
								</MenuList>
							</Menu>
							<Link to={currentUser ? '/cart' : '/signin'}>
								<Box
									bg={useColorModeValue('white', 'gray.600')}
									cursor='pointer'
									position='relative'
									px={4}
									py={3}
									borderRadius='md'
									_hover={{ bg: useColorModeValue('gray.200', 'gray.500') }}
								>
									<Circle
										size={'15px'}
										position='absolute'
										top={1.5}
										right={1.5}
										bg='teal'
										color={'white'}
										fontSize='smaller'
									>{`${currentUser?.cart || 0}`}</Circle>

									<BsCart3 fill={useColorModeValue('gray.800', 'white')} />
								</Box>
							</Link>
						</Flex>
					</Flex>
					<Search
						filterText={filterText}
						onFilterTextChange={onFilterTextChange}
						display={isLessThan800 ? 'flex' : 'none'}
						width={'100%'}
						navigate={navigate}
					/>
				</Flex>
			</Box>
		</>
	);
}

export default Navbar;
