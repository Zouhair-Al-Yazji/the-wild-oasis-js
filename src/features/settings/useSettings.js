import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

export function useSettings() {
	const {
		isError,
		error,
		isPending,
		data: settings,
	} = useQuery({
		queryKey: ['settings'],
		queryFn: getSettings,
	});

	return { isError, error, isPending, settings };
}
