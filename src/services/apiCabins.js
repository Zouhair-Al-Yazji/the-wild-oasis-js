import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded!');
	}

	return data;
}

export async function createUpdateCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');

	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create/Update cabin
	let query = supabase.from('cabins');
	let result;

	// A) create cabin
	if (!id) {
		const { data, error } = await query
			.insert([{ ...newCabin, image: imagePath }])
			.select()
			.single();

		if (error) throw new Error('Cabin could not be created!');

		result = data;
	} else {
		// B) edit cabin
		const { data, error } = await query
			.update({ ...newCabin, image: imagePath })
			.eq('id', id)
			.select()
			.single();

		if (error) throw new Error('Cabin could not be updated!');

		result = data;
	}

	if (!hasImagePath) {
		const { error: storageError } = await supabase.storage
			.from('cabin-images')
			.upload(imageName, newCabin.image);

		// 3- deleting the cabin IF there was an error uploading image
		if (storageError) {
			if (!id) {
				await supabase.from('cabins').delete().eq('id', data.id);
				throw new Error('Image upload failed. Cabin deleted.');
			} else {
				throw new Error('Image upload failed (but cabin was updated).');
			}
		}
	}

	return result;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);
	if (error) {
		console.error(error);
		throw new Error('Cabin could not be deleted!');
	}
}
