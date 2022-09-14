import { useEffect, useState } from 'react';
import './App.css';
import { Container } from '@chakra-ui/react';
import Navbar from './components/Navbar.components';
import Products from './components/Products.components';
import Footer from './components/Footer.components';
import { CurrentUserContext } from './contexts/user.contexts';
import { IUser } from './interfaces/user.interfaces';
import AlertComponent from './components/AlertComponent.components';
import { Outlet, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart.components';
import Checkout from './components/Checkout.components';
import SignIn from './components/SignIn.components';
import SignUp from './components/SignUp.component';
import ForgetPassword from './components/ForgetPassword.components';
import ResetPassword from './components/ResetPassword.components'
import PageNotFound from './components/PageNotFound.components';
import AdminNavbar from './components/AdminNavbar.components';
import AdminFooter from './components/AdminFooter.components';
import AdminProducts from './components/AdminProducts.components';
import AdminUsers from './components/AdminUsers.components';
import Orders from './components/Orders.components';
import AdminOrders from './components/AdminOrders.components';
import Account from './components/Account.components';
import PrivacyPolicy from './components/PrivacyPolicy.components';
import TermsAndConditions from './components/TermsAndConditions.components';
import RefundPolicy from './components/RefundPolicy.components';
import AboutUs from './components/AboutUs.components';
import ContactUs from './components/ContactUs.components';
import Careers from './components/Careers.components';
import authService from './services/auth';

function App() {
	const [filterText, setFilterText] = useState('');
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);
	useEffect(() => {
		async function autoLogin() {
			const login = window.localStorage.getItem('ILERI_USER_LOGIN');
			if (login) {
				const credentials = await authService.login(JSON.parse(login));
				setCurrentUser(credentials);
				authService.setToken(credentials.token);
			}
		}
		autoLogin();
	}, [])
	return (
		<Container maxW={'1200px'} p={'10px'} bg='#F9F9F9'>
			<CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
				{currentUser?.message && (
					<AlertComponent
						status={currentUser.status}
						message={currentUser.message}
					/>
				)}
				{/*User Routes*/}
				<Routes>
					<Route
						path='/'
						element={
							<>
								<nav>
									<Navbar
										filterText={filterText}
										onFilterTextChange={setFilterText}
									/>
								</nav>
								<main>
									<Outlet />
								</main>
								<footer>
									<Footer />
								</footer>
							</>
						}
					>
						<Route path='/' element={<Products filterText={filterText} />} />
						<Route
							path={'cart'}
							element={currentUser ? <Cart /> : <SignIn />}
						/>
						<Route
							path='checkout'
							element={currentUser ? <Checkout /> : <SignIn />}
						/>
						<Route path='privacy-policy' element={<PrivacyPolicy />} />
						<Route
							path='terms-and-conditions'
							element={<TermsAndConditions />}
						/>
						<Route path='refund-policy' element={<RefundPolicy />} />
						<Route path='about-us' element={<AboutUs />} />
						<Route path='contact-us' element={<ContactUs />} />
						<Route path='careers' element={<Careers />} />
						<Route
							path='orders'
							element={currentUser ? <Orders /> : <SignIn />}
						/>
						<Route
							path='account'
							element={currentUser ? <Account /> : <SignIn />}
						/>
						<Route path='signin' element={<SignIn />} />
						<Route path='signup' element={<SignUp />} />
						<Route path='reset' element={<ForgetPassword />} />
						<Route path='passwordReset' element={<ResetPassword />} />
					</Route>
					{/*Admin Routes*/}
					<Route
						path='/admin'
						element={
							<>
								<nav>
									<AdminNavbar />
								</nav>
								<main>
									<Outlet />
								</main>
								<footer>
									<AdminFooter />
								</footer>
							</>
						}
					>
						<Route index element={<SignIn />} />
						<Route
							path='products'
							element={
								currentUser?.role === 'admin' ? <AdminProducts /> : <SignIn />
							}
						/>
						<Route
							path='users'
							element={
								currentUser?.role === 'admin' ? <AdminUsers /> : <SignIn />
							}
						/>
						<Route
							path='orders'
							element={
								currentUser?.role === 'admin' ? <AdminOrders /> : <SignIn />
							}
						/>
					</Route>
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</CurrentUserContext.Provider>
		</Container>
	);
}

export default App;
