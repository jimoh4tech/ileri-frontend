import {
	Box,
	Container,
	SimpleGrid,
	Stack,
	Text,
	Flex,
	useColorModeValue,
	Image,
	VisuallyHidden,
	useMediaQuery,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../logo.png';

const Logo = () => {
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');
	return (
		<Image src={logo} alt='logo' maxW={isLessThan500 ? '150px' : '230px'} />
	);
};

const ListHeader = ({ children }: { children: ReactNode }) => {
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');
	return (
		<Text fontWeight={'500'} fontSize={isLessThan500 ? 'md' : 'lg'} mb={2}>
			{children}
		</Text>
	);
};

function ListItem({ title, value }: { title: string; value: string }) {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');
	return (
		<>
			<Text
				cursor={'pointer'}
				fontSize={isLessThan500 ? 'smaller' : 'medium'}
				onClick={onOpen}
			>
				{title}
			</Text>
			<Modal
				blockScrollOnMount={false}
				isOpen={isOpen}
				onClose={onClose}
				size={isLessThan500 ? 'xs' : 'md'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>{value}</Text>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='teal' mr={3} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
const SocialButton = ({
	children,
	label,
	href,
}: {
	children: ReactNode;
	label: string;
	href: string;
}) => {
	return (
		<Box
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</Box>
	);
};

export default function Footer() {
	const product = [
		{ title: 'Contracts', value: 'I am Contracts' },
		{ title: 'Delivery Locations', value: 'I am Delivery Locations' },
		{ title: 'Pricing', value: 'I am Pricing' },
	];
	const company = [
		{ title: 'About Us', value: 'I am About Us' },
		{ title: 'Careers', value: 'I am Careers' },
		{ title: 'Contact Us', value: 'I am Contact Us' },
	];
	const legal = [
		{ title: 'Privacy Policy', value: 'I am Privacy Policy' },
		{ title: 'Terms of Services', value: 'I am Terms of Services' },
		{ title: 'Refund Policy', value: 'I am Refund Policy' },
	];
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');

	return (
		<Box
			bg={useColorModeValue('teal.500', 'teal.900')}
			color={useColorModeValue('white', 'white')}
			mt='60px'
		>
			<Container as={Stack} maxW={'6xl'} py={10}>
				<SimpleGrid minChildWidth={'150px'} spacing={isLessThan500 ? 3 : 8}>
					<Stack align={'flex-start'}>
						<ListHeader>Product</ListHeader>
						{product.map((it) => (
							<ListItem key={it.title} title={it.title} value={it.value} />
						))}
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Company</ListHeader>
						{company.map((it) => (
							<ListItem key={it.title} title={it.title} value={it.value} />
						))}
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Legal</ListHeader>
						{legal.map((it) => (
							<ListItem key={it.title} title={it.title} value={it.value} />
						))}
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Stay Connected</ListHeader>
						<Stack direction={'row'} spacing={6}>
							<SocialButton label={'Twitter'} href={'#'}>
								<FaTwitter />
							</SocialButton>
							<SocialButton label={'Facebook'} href={'#'}>
								<FaFacebook />
							</SocialButton>
							<SocialButton label={'Instagram'} href={'#'}>
								<FaInstagram />
							</SocialButton>
						</Stack>
					</Stack>
				</SimpleGrid>
			</Container>
			<Box py={10}>
				<Flex
					align={'center'}
					_before={{
						content: '""',
						borderBottom: '1px solid',
						borderColor: useColorModeValue('gray.200', 'gray.700'),
						flexGrow: 1,
						mr: 8,
					}}
					_after={{
						content: '""',
						borderBottom: '1px solid',
						borderColor: useColorModeValue('gray.200', 'gray.700'),
						flexGrow: 1,
						ml: 8,
					}}
				>
					<RouterLink to='/'>
						<Logo />
					</RouterLink>
				</Flex>
				<Text
					pt={6}
					px='2'
					fontSize={isLessThan500 ? '11px' : 'sm'}
					textAlign={'center'}
				>
					© 2022 Ileri-Oluwa Jim-Kad Ventures. All rights reserved
				</Text>
			</Box>
		</Box>
	);
}
