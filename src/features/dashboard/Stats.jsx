import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2';

export default function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	const numBookings = bookings.length;
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
	const checkIns = confirmedStays.length;
	const occupationRate =
		(confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount)) * 100;

	return (
		<>
			<Stat title={'Bookings'} color={'blue'} icon={<HiOutlineBriefcase />} value={numBookings} />
			<Stat
				title={'Sales'}
				color={'green'}
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title={'Check ins'}
				color={'indigo'}
				icon={<HiOutlineCalendarDays />}
				value={checkIns}
			/>
			<Stat
				title={'Occupancy rate'}
				color={'yellow'}
				icon={<HiOutlineChartBar />}
				value={Math.round(occupationRate) + '%'}
			/>
		</>
	);
}
