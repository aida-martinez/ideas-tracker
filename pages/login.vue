<!-- pages/login.vue -->
<script setup>
	import { ref } from 'vue';

	// Access user composable functions
	const user = useUserSession();

	const isSignUp = ref(false);

	// Login user event handler
	const handleLogin = async (event) => {
		const form = event.target;
		const formData = new FormData(form);

		await user.login(formData.get('email'), formData.get('password'));

		form.reset(); // Clear the form
	};

	const handleRegistration = async (event) => {
		const form = event.target;
		const formData = new FormData(form);

		await user.register(formData.get('username'), formData.get('email'), formData.get('password'));

		form.reset(); // Clear the form
	};
</script>

<template>
	<div class="container">
		<section class="w-5/12 mx-auto my-10">
			<h2 class="title-section">Login/Register</h2>

			<AuthForm v-if="isSignUp" :handle-submit="handleRegistration" submit-type="Sign Up"></AuthForm>
			<AuthForm v-else :handle-submit="handleLogin" submit-type="Log In"></AuthForm>
			
			<button v-if="isSignUp" @click="isSignUp = false" class="ml-8 mt-4">
				Already have an account? <span class="font-semibold">Log in</span>
			</button>
			<button v-else @click="isSignUp = true" class="ml-8 mt-4">
				Don't have an account? <span class="font-semibold">Sign up</span>
			</button>
		</section>
	</div>
</template>
