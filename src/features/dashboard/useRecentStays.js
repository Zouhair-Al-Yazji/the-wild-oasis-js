import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
	const [searchParam] = useSearchParams();

	const numDays = !searchParam.get('last') ? 7 : Number(searchParam.get('last'));
	const queryDay = subDays(new Date(), numDays).toISOString();

	const { isPending, data: stays } = useQuery({
		queryKey: ['stays', `last-${numDays}`],
		queryFn: () => getStaysAfterDate(queryDay),
	});

	const confirmedStays = stays?.filter(
		stay => stay.status === 'checked-in' || stay.status === 'checked-out'
	);

	return { isPending, stays, confirmedStays, numDays };
}
