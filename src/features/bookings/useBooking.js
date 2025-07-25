import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../services/apiBookings';

export function useBooking() {
	const { bookingId } = useParams();

	const {
		data: booking,
		error,
		isPending,
		isError,
	} = useQuery({
		queryKey: ['booking', bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false,
	});

	return { booking, error, isPending, isError };
}
