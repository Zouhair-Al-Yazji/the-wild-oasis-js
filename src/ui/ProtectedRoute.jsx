import { useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import styled from 'styled-components';
import { useEffect } from 'react';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-gray-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	// 1. load the authenticated user
	const { isAuthenticated, isPending } = useUser();

	// 3. if there is NO authenticated user, redirect to login page
	useEffect(
		function () {
			if (!isAuthenticated && !isPending) navigate('/login');
		},
		[isAuthenticated, isPending, navigate]
	);

	// 2. while loading show a spinner
	if (isPending)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// 4. if there IS a user, render the app
	if (isAuthenticated) return children;
}
