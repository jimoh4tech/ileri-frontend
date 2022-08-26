import { Heading, ListItem, Stack, Text, UnorderedList, useMediaQuery } from "@chakra-ui/react";
import { Socials } from "./Footer.components";

function ContactUs() {
  const [isLessThan500] = useMediaQuery('(max-width:500px)');
  return (
		<Stack p='5' gap={isLessThan500 ? 2 : 5}>
			<Heading as={'h1'} fontSize={isLessThan500 ? 'xl' : '2xl'}>
				Contact Us
			</Heading>
			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Our Sites
			</Heading>
			<Stack gap={2}>
				<Text>Below are the addresses to our sites:</Text>
				<UnorderedList px={6}>
					<ListItem>First Gate, Iba Housing Estate, Ojo Lagos.</ListItem>
					<ListItem>New Estate, Iba Housing Estate, Ojo Lagos.</ListItem>
				</UnorderedList>
			</Stack>

			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Our Contacts
			</Heading>
			<Stack px={10}>
				<ul>
					<Stack>
						<li>
							<p>By email: ilerioluwaindustry@gmail.com</p>
						</li>
						<li>
							<p>
								By visiting this page on our website:{' '}
								<a
									href='https://ilerioluwa.vercel.app'
									rel='external nofollow noopener'
								>
									https://ilerioluwa.vercel.app
								</a>
							</p>
						</li>
						<li>
							<p>By phone number: +234 7063 543 225</p>
						</li>
					</Stack>
				</ul>
			</Stack>
			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Stay Connected
			</Heading>
			<Socials />
		</Stack>
	);
}

export default ContactUs;