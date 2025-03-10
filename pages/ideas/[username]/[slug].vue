<script setup>
import MarkdownIt from 'markdown-it';

const route = useRoute();
const username = route.params.username;
const slug = route.params.slug;

const user = useUserSession();
const ideas = useIdeas();
const router = useRouter();

const isLoading = ref(true);

const getTheIdea = async () => {
  try {
    // Check if we're still waiting for user session
    if (user.current.value === undefined) {
      return;
    }
    
    // If user is not logged in or username doesn't match, redirect
    if (!user.current.value || user.username.value !== username) {
      isLoading.value = false;
      return router.push('/');
    }
    
    await ideas.fetchOne(slug);
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching idea:', error);
    isLoading.value = false;
    router.push('/');
  }
};

const currentIdea = computed(() => {
  const current = toRef(ideas, 'current');
  return current.value?.[0];
});

const splitTags = (tags) => {
  if (!tags) return [];
  return tags.split(',').map((tag) => tag.trim());
};

const md = new MarkdownIt();

const htmlContent = computed(() => {
  return currentIdea.value?.content ? md.render(currentIdea.value.content) : '';
});
const htmlDescription = computed(() => {
  return currentIdea.value?.description ? md.render(currentIdea.value.description) : '';
});

// Watch for user session changes
watch(() => user.current.value, (newVal) => {
  if (newVal !== undefined) {
    getTheIdea();
  }
}, { immediate: true });
</script>

<template>
  <div class="container my-10">
    <div v-if="!isLoading && currentIdea" class="idea-details">
      <header class="flex gap-10">
        <h1 class="title-section">{{ currentIdea.title }}</h1>
        <div class="meta">
          <ul class="flex flex-wrap gap-2">
            <li v-for="tag in splitTags(currentIdea.tags)" :key="tag" class="text-sm py-0.5 px-3 bg-green rounded-2xl">{{ tag }}</li>
          </ul>
        </div>
      </header>
      <div class="description mb-4" v-html="htmlDescription"></div>
      <article class="border-t border-purple/20 mt-10 pt-10">
        <div class="content prose prose-invert" v-html="htmlContent"></div>
      </article>
    </div>
    <div v-else-if="isLoading" class="text-center py-10">
      Loading...
    </div>
    <div v-else class="text-center py-10">
      Redirecting to home page...
    </div>
  </div>
</template>
