import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import CreateCabinForm from './CreateCabinForm';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { isCreating, createCabin } = useCreateCabin();

	const { id: cabinId, name, image, maxCapacity, regularPrice, discount, description } = cabin;

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			image,
			maxCapacity,
			regularPrice,
			discount,
			description,
		});
	}

	return (
		<Table.Row>
			<Img src={image} alt={name} role="cell" />
			<Cabin role="cell">{name}</Cabin>
			<div role="cell">Fits up {maxCapacity} guests</div>
			<Price role="cell">{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount role="cell">{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={cabinId} />

						<Menus.List id={cabinId}>
							<Menus.Button
								icon={<HiSquare2Stack />}
								onClick={handleDuplicate}
								disabled={isCreating}
							>
								Duplicate
							</Menus.Button>

							<Modal.Open opens="update-cabin">
								<Menus.Button icon={<HiPencil />}>Update</Menus.Button>
							</Modal.Open>

							<Modal.Open opens="delete-cabin">
								<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name="update-cabin">
							<CreateCabinForm cabinToUpdate={cabin} />
						</Modal.Window>

						<Modal.Window name="delete-cabin">
							<ConfirmDelete
								resourceName={`Cabin ${name}`}
								disabled={isDeleting}
								onConfirm={() => deleteCabin(cabinId)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
}
