import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
	const {
		data: cabins,
		error,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
	});

	return { cabins, error, isPending, isError };
}
