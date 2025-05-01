import styled from 'styled-components';

import { useCabins } from './useCabins';
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';

const Table = styled.div`
	border: 1px solid var(--color-grey-200);

	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-md);
	overflow: hidden;
`;

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

export default function CabinTable() {
	const { isPending, isError, error, cabins } = useCabins();

	if (isPending) return <Spinner />;

	if (isError) return <p>{error.message}</p>;

	return (
		<Table role="table">
			<TableHeader role="row">
				<div role="cell"></div>
				<div role="cell">cabin</div>
				<div role="cell">capacity</div>
				<div role="cell">price</div>
				<div role="cell">discount</div>
				<div role="cell"></div>
			</TableHeader>
			{cabins.map(cabin => (
				<CabinRow cabin={cabin} key={cabin.id} />
			))}
		</Table>
	);
}
