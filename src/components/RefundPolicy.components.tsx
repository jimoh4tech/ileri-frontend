import {
	Heading,
	Stack,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';

function RefundPolicy() {
	const [isLessThan500] = useMediaQuery('(max-width:500px)');
	return (
		<Stack
			p='5'
			gap={isLessThan500 ? 2 : 5}
			bg={useColorModeValue('white', 'gray.600')}
		>
			<Heading as={'h1'} fontSize={isLessThan500 ? 'xl' : '2xl'}>
				Return and Refund Policy
			</Heading>
			<p>Last updated: August 25, 2022</p>
			<p>Thank you for shopping at ILERI-OLUWA JIM-KAD.</p>
			<p>
				If, for any reason, You are not completely satisfied with a purchase We
				invite You to review our policy on refunds and returns.
			</p>
			<p>
				The following terms are applicable for any products that You purchased
				with Us.
			</p>
			<Heading as={'h1'} fontSize={isLessThan500 ? 'xl' : '2xl'}>
				Interpretation and Definitions
			</Heading>
			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Interpretation
			</Heading>
			<p>
				The words of which the initial letter is capitalized have meanings
				defined under the following conditions. The following definitions shall
				have the same meaning regardless of whether they appear in singular or
				in plural.
			</p>
			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Definitions
			</Heading>
			<p>For the purposes of this Return and Refund Policy:</p>
			<Stack px={10}>
				<ul>
					<Stack>
						<li>
							<p>
								<strong>Company</strong> (referred to as either &quot;the
								Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;
								in this Agreement) refers to ILERI-OLUWA JIM-KAD Ventures, 201,
								Iba Housing Estate, Ojo. Lagos.
							</p>
						</li>
						<li>
							<p>
								<strong>Goods</strong> refer to the items offered for sale on
								the Service.
							</p>
						</li>
						<li>
							<p>
								<strong>Orders</strong> mean a request by You to purchase Goods
								from Us.
							</p>
						</li>
						<li>
							<p>
								<strong>Service</strong> refers to the Website.
							</p>
						</li>
						<li>
							<p>
								<strong>Website</strong> refers to ILERI-OLUWA JIM-KAD,
								accessible from{' '}
								<a
									href='https://ilerioluwa.vercel.app'
									rel='external nofollow noopener'
								>
									https://ilerioluwa.vercel.app
								</a>
							</p>
						</li>
						<li>
							<p>
								<strong>You</strong> means the individual accessing or using the
								Service, or the company, or other legal entity on behalf of
								which such individual is accessing or using the Service, as
								applicable.
							</p>
						</li>
					</Stack>
				</ul>
			</Stack>
			<Heading as={'h1'} fontSize={isLessThan500 ? 'xl' : '2xl'}>
				Your Order Cancellation Rights
			</Heading>
			<p>
				You are entitled to cancel Your Order while the status is still &quot;confirmed&quot; without giving any
				reason for doing so.
			</p>
			<p>
				The deadline for cancelling an Order is before the status changed to "Shipped" or "Delivered".
			</p>
			<p>
				In order to exercise Your right of cancellation, You must inform Us of
				your decision by means of a clear statement. You can inform us of your
				decision by:
			</p>
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
			<p>
				We will reimburse You no later than 7 days from the day on which We
				receive the cancellation request. We will use the same means of payment as You
				used for the Order, and You will not incur any fees for such
				reimbursement.
			</p>
			<Heading as={'h1'} fontSize={isLessThan500 ? 'xl' : '2xl'}>
				Conditions for Returns
			</Heading>
			<p>
				In order for the Goods to be eligible for a return, please make sure
				that:
			</p>
			<Stack px={10}>
				<ul>
					<Stack>
						<li>The Goods were purchased status is still "confirmed"</li>
					</Stack>
				</ul>
			</Stack>
			<p>The following Goods cannot be returned:</p>
			<Stack px={10}>
				<ul>
					<Stack>
						<li>
							The supply of Goods made to Your specifications or clearly
							personalized.
						</li>
						<li>
							The supply of Goods which according to their nature are not
							suitable to be returned, deteriorate rapidly or where the date of
							expiry is over.
						</li>
						<li>
							The supply of Goods which are not suitable for return due to
							health protection or hygiene reasons and were unsealed after
							delivery.
						</li>
						<li>
							The supply of Goods which are, after delivery, according to their
							nature, inseparably mixed with other items.
						</li>
					</Stack>
				</ul>
			</Stack>
			<p>
				We reserve the right to refuse returns of any merchandise that does not
				meet the above return conditions in our sole discretion.
			</p>
			<p>
				Only regular priced Goods may be refunded. Unfortunately, Goods on sale
				cannot be refunded. This exclusion may not apply to You if it is not
				permitted by applicable law.
			</p>
			<Heading as={'h1'} fontSize={isLessThan500 ? 'xl' : '2xl'}>
				Returning Goods
			</Heading>
			<p>
				You are responsible for the cost and risk of returning the Goods to Us.
				You should send the Goods at the following address:
			</p>
			<p>
				201, Iba Housing Estate,
				<br />
				Ojo Lagos State
			</p>
			<p>
				We cannot be held responsible for Goods damaged or lost in return
				shipment. Therefore, We recommend an insured and trackable mail service.
				We are unable to issue a refund without actual receipt of the Goods or
				proof of received return delivery.
			</p>
			<Heading as={'h1'} fontSize={isLessThan500 ? 'xl' : '2xl'}>
				Gifts
			</Heading>
			<p>
				If the Goods were marked as a gift when purchased and then shipped
				directly to you, You'll receive a gift credit for the value of your
				return. Once the returned product is received, a gift certificate will
				be mailed to You.
			</p>
			<p>
				If the Goods weren't marked as a gift when purchased, or the gift giver
				had the Order shipped to themselves to give it to You later, We will
				send the refund to the gift giver.
			</p>
			<Heading as={'h2'} fontSize={isLessThan500 ? 'md' : 'xl'}>
				Contact Us
			</Heading>
			<p>
				If you have any questions about our Returns and Refunds Policy, please
				contact us:
			</p>
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
		</Stack>
	);
}

export default RefundPolicy;
