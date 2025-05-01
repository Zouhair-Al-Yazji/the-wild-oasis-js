import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import Spinner from './ui/Spinner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import CompoundComponentPattern from './CompoundComponentPattern';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Cabins = lazy(() => import('./pages/Cabins'));
const Users = lazy(() => import('./pages/Users'));
const Settings = lazy(() => import('./pages/Settings'));
const Account = lazy(() => import('./pages/Account'));
const Login = lazy(() => import('./pages/Login'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// create client
const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<Router>
				<Suspense fallback={<Spinner />}>
					<Routes>
						<Route element={<AppLayout />}>
							<Route index element={<Navigate replace to="dashboard" />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="bookings" element={<Bookings />} />
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
	);
}
