<script setup>
import { SquareMinus, Pencil } from 'lucide-vue-next';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import MarkdownIt from 'markdown-it';

const ideas = useIdeas();
const user = useUserSession();
const errors = ref('');
const md = new MarkdownIt();

// Add a method to render markdown
const renderMarkdown = (content) => {
    return content ? md.render(content) : '';
};

// Watch for user session changes
watch(() => user.current.value, (newVal) => {
    if (newVal) {
        ideas.fetch();
    }
}, { immediate: true });

const handleUpdate = async (event) => {
	const form = event.target;
	const formData = new FormData(form);

	// Extract the values from the FormData object and add userId
	const postIdeaData = {
		$id: formData.get('$id'),
		title: formData.get('title'),
		description: formData.get('description'),
		tags: formData.get('tags'),
		slug: formData.get('slug'),
		updateSlug: formData.get('update_slug'),
	};

	const response = await ideas.update(postIdeaData);

	if ( ! response.success ) {
		errors.value = response.message;
		return;
	} else {
		errors.value = '';
	}
};

const splitTags = (tags) => {
	if (!tags) return [];
	return tags.split(',').map((tag) => tag.trim());
};
</script>

<template>
	<section>
		<article>
			<h4 class="title-section">Your Ideas</h4>

			<ul class="space-y-4">
				<template v-if="ideas.current?.value && ideas.current.value.length">
					<li v-for="idea in ideas.current.value" class="">
						<div class="relative bg-purple/10 py-4 px-6 rounded-xl">
							<NuxtLink :to="`/ideas/${user.username.value}/${idea.slug}`">
								<h5 class="text-xl">{{ idea.title }}</h5>
							</NuxtLink>
							<div class="text-base prose" v-html="renderMarkdown(idea.description)"></div>

							<template v-if="idea.tags">
								<hr class="my-4 bg-purple/20" />
								<ul class="flex flex-wrap gap-2">
									<li v-for="tag in splitTags(idea.tags)" :key="tag" class="text-sm py-0.5 px-3 bg-green rounded-2xl">{{ tag }}</li>
								</ul>
							</template>

							<div class="absolute top-3 right-3 space-x-4">
								<Drawer>
									<DrawerTrigger>
										<button
											v-if="user.current.value && idea.userId === user.current.value.userId"
											aria-label="Update item" type="button" title="Update item"
											>
											<Pencil />
										</button>
									</DrawerTrigger>
									<DrawerContent class="w-6/12 mx-auto">
										<form @submit.prevent="handleUpdate">
											<DrawerHeader>
												<DrawerTitle class="mb-4">Edit idea</DrawerTitle>
												<DrawerDescription class="form-list">
													<p v-if="errors">
														<span class="text-red-500">{{ errors }}</span>
													</p>
													<div>
														<label class="label">Title</label>
														<input type="text" :value="idea.title" name="title" aria-label="title"/>
													</div>
													<div class="flex gap-8">
														<div>
															<label class="label">Slug</label>
															<input type="text" :value="idea.slug" name="slug" aria-label="slug" readonly />
														</div>
														<div>
															<label class="label">Update with new title?</label>
															<input class="w-fit" type="checkbox" id="update_slug" name="update_slug" value="update_slug">
														</div>
													</div>
													<div>
														<label class="label">Description</label>
														<textarea :value="idea.description" name="description" />
													</div>
													<div>
														<label class="label">Tags</label>
														<input type="text" :value="idea.tags" name="tags" aria-label="tags"/>
													</div>
													<div>
														<input type="hidden" :value="idea.$id" name="$id"/>
													</div>
												</DrawerDescription>
											</DrawerHeader>
											<DrawerFooter>
												<button type="submit" class="button w-fit mx-auto">Submit</button>
												<DrawerClose>
													<button data-name="close" type="button" class="button-outline">
														Cancel
													</button>
												</DrawerClose>
											</DrawerFooter>
										</form>
									</DrawerContent>
								</Drawer>
								
								<button class="" aria-label="Remove item" v-if="user.current.value &&
									idea.userId === user.current.value.userId
									" type="button" @click="ideas.remove(idea.$id)" title="Remove item">
									<SquareMinus />
								</button>
							</div>
						</div>
					</li>
				</template>
				<template v-else>
					<p>No ideas yet.</p>
				</template>
			</ul>
		</article>
	</section>
</template>