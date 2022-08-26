import { Heading, Stack, Text, useMediaQuery } from '@chakra-ui/react';

function AboutUs() {
	const [isLessThan500] = useMediaQuery('(max-width:500px)');
	return (
		<Stack p='5' gap={isLessThan500 ? 2 : 5}>
			<Heading as={'h1'} fontSize={isLessThan500 ? 'xl' : '2xl'}>
				About Us
			</Heading>
			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				The Company
			</Heading>
			<Text>
				ILERI-OLUWA JIM-KAD Ventures was established in feburary 15, 2011. Since
				its establishment, it has always acted inline with its mission while
				having its vision as a roadmap.{' '}
			</Text>

			<Text>
				We currently own and operates in two sites and delivery building materials
				like cement blocks, cements, sharp sand, plaster sand, granite, etc. {' '}
			</Text>

			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Mission
			</Heading>
			<Text>
				Our mission is to delivery quality products and services that meet the
				needs of our customers. We are confident in our ability to do so, and we
				strive to be reliable and trustworthy in all that we do.
			</Text>

			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Vision
			</Heading>
			<Text>
				To produce quality building materials that would build confidence in
				construction engineers and building owners.
			</Text>

			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				The Founder &amp; CEO
			</Heading>
			<Text>
				Mr. Jimoh Kadiri is an entrepreneur with a customers-first principle. He
				had background in Engineering before identifying his dreams and passion
				for the production of building materials.{' '}
			</Text>
		</Stack>
	);
}
export default AboutUs;
