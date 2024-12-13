<script setup>
import { SquarePlus } from 'lucide-vue-next';

const ideas = useIdeas();
const user = useUserSession();
const errors = ref('');

const handleAddIdea = async (event) => {
	const form = event.target;
	const formData = new FormData(form);

	// Extract the values from the FormData object and add userId
	const postIdeaData = {
		userId: user.current.value.userId,
		title: formData.get('title'),
		description: formData.get('description'),
		tags: formData.get('tags'),
	};

	const response = await ideas.add(postIdeaData);

	if ( ! response.success ) {
		errors.value = response.message;
		return;
	} else {
		errors.value = '';
		form.reset();
	}
};
</script>

<template>
	<div>
		<article class="container padding-0">
			<h4 class="title-section">Submit Idea</h4>
			<p v-if="errors" class="text-red-500 mb-4">
				{{ errors }}
			</p>
			<form @submit.prevent="handleAddIdea" class="u-margin-block-start-16">
				<ul class="form-list">
					<li class="form-item">
						<label class="label">Title</label>
						<input
						type="text"
						placeholder="Title"
						name="title"
						/>
					</li>
					<li class="form-item">
						<label class="label">Description</label>
						<textarea
						placeholder="Description"
						name="description"
						/>
					</li>
					<li class="form-item">
						<label class="label">Tags <small>commma separated</small></label>
						<input
						type="text"
						placeholder="Idea tags"
						name="tags"
						/>
					</li>
					<button class="button flex items-center gap-2" aria-label="Submit idea" type="submit">
						Submit <SquarePlus />
					</button>
				</ul>
			</form>
		</article>
	</div>
</template>
