import { useCabins } from './useCabins';
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

export default function CabinTable() {
	const { isPending, isError, error, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	// 1. FILTER
	const filterValue = searchParams.get('discount') || 'all';

	let filteredCabins;

	if (isPending) return <Spinner />;

	if (isError) return <p>{error.message}</p>;

	if (filterValue === 'all') filteredCabins = cabins;
	if (filterValue === 'no-discount') filteredCabins = cabins.filter(cabin => cabin.discount === 0);
	if (filterValue === 'with-discount') filteredCabins = cabins.filter(cabin => cabin.discount > 0);

	// 2. SORT
	const sortBy = searchParams.get('sortBy') || 'startDate-asc';
	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;
	const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

	return (
		<Menus>
			<Table $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div role="cell"></div>
					<div role="cell">cabin</div>
					<div role="cell">capacity</div>
					<div role="cell">price</div>
					<div role="cell">discount</div>
					<div role="cell"></div>
				</Table.Header>
				<Table.Body
					data={sortedCabins}
					render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
}
