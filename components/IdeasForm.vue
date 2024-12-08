<script setup>
import { SquarePlus } from 'lucide-vue-next';

const ideas = useIdeas();
const user = useUserSession();

const handleAddIdea = async (event) => {
	const form = event.target;
	const formData = new FormData(form);

	// Extract the values from the FormData object and add userId
	const postIdeaData = {
		userId: user.current.value.userId,
		title: formData.get('title'),
		description: formData.get('description'),
	};

	await ideas.add(postIdeaData);

	form.reset(); // Clear the form
};
</script>

<template>
	<div>
		<article class="container padding-0">
			<h4 class="title-section">Submit Idea</h4>
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
					<button class="button flex items-center gap-2" aria-label="Submit idea" type="submit">
						Submit <SquarePlus />
					</button>
				</ul>
			</form>
		</article>
	</div>
</template>
