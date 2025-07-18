import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Modal from '../../ui/Modal';
import Empty from '../../ui/Empty';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useDeleteBooking } from './useDeleteBooking';
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isPending } = useBooking();
	const navigate = useNavigate();
	const moveBack = useMoveBack();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	const statusToTagName = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	};

	const { status, id: bookingId } = booking || {};

	if (isPending) return <Spinner />;
	if (!booking) return <Empty resourceName="booking" />;

	return (
		<>
			<Row $type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag $type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === 'unconfirmed' && (
					<Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>
						Check in
					</Button>
				)}

				{status === 'checked-in' && (
					<Button
						icon={<HiArrowUpOnSquare />}
						disabled={isCheckingOut}
						onClick={() => checkout(bookingId)}
					>
						Check out
					</Button>
				)}

				<Modal>
					<Modal.Open opens="delete">
						<Button $variation="danger">Delete booking</Button>
					</Modal.Open>
					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName="booking"
							onConfirm={() => deleteBooking(bookingId, { onSettled: () => navigate(-1) })}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Modal>

				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
