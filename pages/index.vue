<script setup>
const user = useUserSession();
</script>

<template>
	<div class="container my-10">
		<!-- Idea form component for logged in users -->
		<section v-if="user.current.value" class="u-margin-32">
			<div class="grid grid-cols-12 gap-6">
				<div class="col-span-4">
					<IdeasForm />
				</div>
				<div class="col-span-7 col-start-6">
					<IdeasList />
				</div>
			</div>
		</section>

		<section v-else>
			<div class="bg-pale rounded-xl p-6">
				<p class="text-lg">Please login to submit an idea or check your list.</p>
			</div>
		</section>

	</div>
</template>