import { useCabins } from './useCabins';
import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

export default function CabinTable() {
	const { isPending, isError, error, cabins } = useCabins();

	if (isPending) return <Spinner />;

	if (isError) return <p>{error.message}</p>;

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
				<Table.Body data={cabins} render={cabin => <CabinRow cabin={cabin} key={cabin.id} />} />
			</Table>
		</Menus>
	);
}
