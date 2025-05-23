import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
		mutationFn: deleteBookingApi,
		onSuccess: data => {
			console.log(data);
			toast.success(`Booking #${data.id} deleted successfully`);
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
		},
		onError: err => toast.error(err.message),
	});

	return { deleteBooking, isDeleting };
}
