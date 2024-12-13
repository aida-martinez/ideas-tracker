import slugify from 'slugify';

export const createSlug = (text) => {
	return slugify(text, {
		lower: true, // Convert to lowercase
		strict: true, // Remove special characters
		remove: /[*+~.()'"!:@]/g // Remove additional characters
	});
};
