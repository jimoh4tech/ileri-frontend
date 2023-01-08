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
	Link,
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
function ListItems({ value, link }: { value: string; link: string }) {
	const [isLessThan500] = useMediaQuery('(max-width: 500px)');
	return (
		<Link
			as={RouterLink}
			to={link}
			fontSize={isLessThan500 ? 'smaller' : 'medium'}
		>
			{value}
		</Link>
	);
}
function ListItem({ title, children }: { title: string; children: ReactNode }) {
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
					<ModalBody>{children}</ModalBody>
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

export const Socials = () => {
	return (
		<Stack direction={'row'} spacing={6}>
			<SocialButton label={'Twitter'} href={'https://twitter.com/ileriJim'}>
				<FaTwitter />
			</SocialButton>
			<SocialButton
				label={'Facebook'}
				href={'https://web.facebook.com/profile.php?id=100085211732596'}
			>
				<FaFacebook />
			</SocialButton>
			<SocialButton
				label={'Instagram'}
				href={'https://www.instagram.com/ileri_oluwa_ventures/'}
			>
				<FaInstagram />
			</SocialButton>
		</Stack>
	);
};

export default function Footer() {
	const product = [
		{
			title: 'Contracts',
			children:
				'Are you a contractor looking for block constructions on your site? You can reach out to us via the details on our contact page',
		},
		{
			title: 'Delivery Locations',
			children:
				'We are striving to expand our delivery market. However, we currently make deliveries in Iba Housing Estate, Igbo Elerin, Agboroko, Ipaye, Peace Estate, Iyana School, Iba Junction, Village, Red Gate, LASU, Post Service.',
		}
	];
	const company = [
		{ value: 'About Us', link: 'about-us' },
		{ value: 'Careers', link: 'careers' },
		{ value: 'Contact Us', link: 'contact-us' },
	];
	const legal = [
		{ value: 'Privacy Policy', link: 'privacy-policy' },
		{ value: 'Terms and Conditions', link: 'terms-and-conditions' },
		{ value: 'Return & Refund Policy', link: 'refund-policy' },
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
							<ListItem key={it.title} {...it} />
						))}
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Company</ListHeader>
						{company.map((it) => (
							<ListItems key={it.value} {...it} />
						))}
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Legal</ListHeader>
						{legal.map((li) => (
							<ListItems key={li.value} {...li} />
						))}
					</Stack>
					<Stack align={'flex-start'}>
						<ListHeader>Stay Connected</ListHeader>
						<Stack direction={'row'} spacing={6}>
							<SocialButton
								label={'Twitter'}
								href={'https://twitter.com/abu4code'}
							>
								<FaTwitter />
							</SocialButton>
							<SocialButton
								label={'Facebook'}
								href={'linkedin.com/in/abdul-quadri-jimoh-69369714a'}
							>
								<FaFacebook />
							</SocialButton>
							<SocialButton
								label={'Instagram'}
								href={'https://www.instagram.com/ileri_oluwa_ventures/'}
							>
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
					© 2023 Ileri-Oluwa Jim-Kad Ventures. All rights reserved
				</Text>
			</Box>
		</Box>
	);
}
