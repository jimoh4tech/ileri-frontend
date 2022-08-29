import { Heading, Stack, Text, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { Socials } from "./Footer.components";
function Careers() {
   const [isLessThan500] = useMediaQuery('(max-width:500px)');
  return (
		<Stack
			p='5'
			gap={isLessThan500 ? 2 : 5}
			bg={useColorModeValue('white', 'gray.600')}
		>
			<Heading as={'h1'} fontSize={isLessThan500 ? 'xl' : '2xl'}>
				Carrer
			</Heading>
			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Our Core Values
			</Heading>
			<Text>
				We are one big family with cooperation and deligently hardworking. We
				provide our employees with a competitive offers amongst our competitor
			</Text>

			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Look our for our Job posting
			</Heading>
			<Socials />
		</Stack>
	);
}

export default Careers;