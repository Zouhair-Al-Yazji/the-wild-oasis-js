import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
	const {
		user: {
			email,
			user_metadata: { fullName: currentFullName },
		},
	} = useUser();
	const { updateUser, isUpdating } = useUpdateUser();

	const [fullName, setFullName] = useState(currentFullName);
	const [avatar, setAvatar] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		if (!fullName) return;
		updateUser(
			{ fullName, avatar },
			{
				onSuccess: () => {
					setAvatar(null);
					e.target.rest();
				},
			}
		);
	}

	function handleCancel() {
		setFullName(currentFullName);
		setAvatar(null);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>

			<FormRow label="Full name">
				<Input
					type="text"
					value={fullName}
					onChange={e => setFullName(e.target.value)}
					id="fullName"
					disabled={isUpdating}
				/>
			</FormRow>

			<FormRow label="Avatar image">
				<FileInput
					disabled={isUpdating}
					id="avatar"
					accept="image/*"
					onChange={e => setAvatar(e.target.files[0])}
				/>
			</FormRow>
			<FormRow>
				<Button onClick={handleCancel} type="reset" disabled={isUpdating} $variation="secondary">
					Cancel
				</Button>
				<Button disabled={isUpdating}>{!isUpdating ? 'Update account' : <SpinnerMini />}</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateUserDataForm;
