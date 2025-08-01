import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { isPending: isCreating, mutate: createCabin } = useMutation({
		mutationFn: createUpdateCabin,
		onSuccess: () => {
			toast.success('New cabin successfully created!');
			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isCreating, createCabin };
}
