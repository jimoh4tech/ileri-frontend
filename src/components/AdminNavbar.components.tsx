import {
	Box,
	Flex,
	HStack,
	Link,
	IconButton,
	Button,
	useDisclosure,
	useColorModeValue,
	Stack,
	Image,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import logo from '../logo.png';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/user.contexts';

const links = [
	{ value: 'Products', link: 'products' },
	{ value: 'Orders', link: 'orders' },
	{ value: 'Users', link: 'users' },
];

const NavLink = ({ value, link }: { value: string; link: string }) => (
	<Link
		px={2}
		py={1}
		rounded={'md'}
		_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('gray.200', 'gray.700'),
		}}
		as={RouterLink}
		to={link}
	>
		{value}
	</Link>
);

export default function AdminNavbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

	const navigate = useNavigate();

	function handlelogout() {
		if (currentUser) {
			setCurrentUser(null);
			navigate('/');
		} else {
			navigate('/secure/admin');
		}
	}
	return (
		<>
			<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <GrClose /> : <GiHamburgerMenu />}
						aria-label={'Open Menu'}
						display={{ md: 'none' }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={'center'}>
						<Link maxW={'300px'} as={RouterLink} to='/secure/admin'>
							<Image src={logo} alt='logo' />
						</Link>
						<HStack
							as={'nav'}
							spacing={4}
							display={{ base: 'none', md: 'flex' }}
						>
							{links.map((val) => (
								<NavLink key={val.value} {...val} />
							))}
						</HStack>
					</HStack>
					<Flex alignItems={'center'}>
						<Button colorScheme={'teal'} onClick={() => 	handlelogout()}>
							{currentUser ? 'Logout' : 'Login'}
						</Button>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							{links.map((val) => (
								<NavLink key={val.value} {...val} />
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
