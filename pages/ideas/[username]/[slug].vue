<script setup>
import MarkdownIt from 'markdown-it';

const route = useRoute();
const username = route.params.username;
const slug = route.params.slug;

const user = useUserSession();
const ideas = useIdeas();

const getTheIdea = () => {
	if ( user.username.value ) {
		if ( user.username.value !== username ) {
			navigateTo('/')
		} else {
			ideas.fetchOne( slug )
			.then(() => {	
				useHead({
					//title: `Idea: ${ideas.idea.title} by ${username}`,
				});
			});
		}
	}
};

const currentIdea = computed(() => {
	const current = toRef(ideas, 'current')
	return current.value?.[0]
})

const splitTags = (tags) => {
	if (!tags) return [];
	return tags.split(',').map((tag) => tag.trim());
};

const md = new MarkdownIt();

const htmlContent = computed(() => md.render(currentIdea.value.content));

// Watch for user session readiness
watch(() => user.username.value, (newVal) => {
	if (newVal) getTheIdea();
});
// Fallback: Log once on mount if data is already loaded
onMounted(() => {
	getTheIdea();
});
</script>

<template>
	<div class="container my-10">
		<div v-if="currentIdea" class="idea-details">
			<header class="flex gap-10">
				<h1 class="title-section">{{ currentIdea.title }}</h1>
				<div class="meta">
					<ul class="flex flex-wrap gap-2">
						<li v-for="tag in splitTags(currentIdea.tags)" :key="tag" class="text-sm py-0.5 px-3 bg-green rounded-2xl">{{ tag }}</li>
					</ul>
				</div>
			</header>
			<div class="description mb-4">
				<p>{{ currentIdea.description }}</p>
			</div>
			<article class="border-t border-purple/20 mt-10 pt-10">
				<div class="content prose" v-html="htmlContent"></div>
			</article>
		</div>
		<div v-else>Loading...</div>
	</div>
</template>
