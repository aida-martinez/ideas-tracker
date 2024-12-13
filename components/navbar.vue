<script setup>
const user = useUserSession();
</script>

<template>
	<div class="py-3 px-6 border-b border-rose-600">
		<!--- Navbar -->
		<nav class="flex justify-between items-center">
			<h3 class="text-4xl font-serif"><a href="/">Ideas Tracker</a></h3>

			<!-- Email and logout button if logged in user -->
			<div
				class="flex items-center gap-4"
				v-if="user.current.value"
				>
				<p>{{ user.current.value.providerUid }}</p>

				<button class="button" type="button" @click="user.logout()">Logout</button>
			</div>
			<!-- Login button if no user logged in -->
			<NuxtLink v-else href="/login" class="button">Login</NuxtLink>
		</nav>
	</div>
</template>
