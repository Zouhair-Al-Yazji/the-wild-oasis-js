import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import Spinner from './ui/Spinner';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Users = lazy(() => import('./pages/Users'));
const Settings = lazy(() => import('./pages/Settings'));
const Account = lazy(() => import('./pages/Account'));
const Login = lazy(() => import('./pages/Login'));
const Booking = lazy(() => import('./pages/Booking'));
const Checkin = lazy(() => import('./pages/Checkin'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const queryClient = new QueryClient();

export default function App() {
	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<GlobalStyles />
				<Router>
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}
							>
								<Route index element={<Navigate replace to="dashboard" />} />
								<Route path="dashboard" element={<Dashboard />} />
								<Route path="bookings" element={<Bookings />} />
								<Route path="bookings/:bookingId" element={<Booking />} />
								<Route path="checkin/:bookingId" element={<Checkin />} />
								<Route path="cabins" element={<Cabins />} />
								<Route path="users" element={<Users />} />
								<Route path="settings" element={<Settings />} />
								<Route path="account" element={<Account />} />
							</Route>
							<Route path="login" element={<Login />} />
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</Router>
				<ReactQueryDevtools initialIsOpen={false} />
				<Toaster
					position="top-center"
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: '16px',
							maxWidth: '500px',
							padding: '16px 24px',
							backgroundColor: 'var(--color-grey-0)',
							color: 'var(--color-grey-700)',
						},
					}}
					containerStyle={{ margin: '8px' }}
					gutter={12}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}
