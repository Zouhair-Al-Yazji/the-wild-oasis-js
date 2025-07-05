import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export function useRecentBookings() {
	const [searchParam] = useSearchParams();

	const numDays = !searchParam.get('last') ? 7 : Number(searchParam.get('last'));
	const queryDay = subDays(new Date(), numDays).toISOString();

	const { isPending, data: bookings } = useQuery({
		queryKey: ['bookings', `last-${numDays}`],
		queryFn: () => getBookingsAfterDate(queryDay),
	});

	return { isPending, bookings };
}
