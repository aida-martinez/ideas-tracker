<script setup>
import { defineProps } from 'vue'
import { createSlug } from "~/utils/slugify";

const props = defineProps({
	handleSubmit: {
		type: Function,
		required: true
	},
	submitType: {
		type: String,
		required: true
	}
})

const userUsername = ref('')

const slug = computed(() => {
	return createSlug( userUsername.value )
})
</script>

<template>
	<form class="bg-pale border border-pink/20 rounded-xl p-8" @submit.prevent="handleSubmit">
		<ul class="form-list">
			<!-- Input field username -->
			<li v-if="submitType === 'Sign Up'" class="form-item">
				<label class="label">Username</label>
				<div class="input-text-wrapper">
					<input
					type="text"
					name="users_username"
					class="input-text"
					placeholder="Your username"
					required
					v-model="userUsername"
					/>
				</div>
				<div class="input-text-wrapper">
					<input
					type="text"
					name="username"
					class="border-none bg-transparent pointer-events-none"
					required readonly
					:value="slug"
					/>
				</div>
				<small>You won't be able to change it later.</small>
			</li>
			<!-- Input field e-mail -->
			<li class="form-item">
				<label class="label">Email</label>
				<div class="input-text-wrapper">
					<input
					type="email"
					name="email"
					class="input-text"
					placeholder="Your Email"
					required
					/>
				</div>
			</li>
			<!-- Input field e-mail -->
			<li class="form-item">
				<label class="label">Password</label>
				<div class="input-text-wrapper">
					<input
					type="password"
					name="password"
					class="input-text"
					placeholder="Your Password"
					required
					/>
				</div>
			</li>
		</ul>
		<ul class="mt-4">
			<!-- Login button  -->
			<li>
				<button class="button" aria-label="Login" @click="handleSubmit" >
					{{submitType}}
				</button>
			</li>
		</ul>
	</form>
</template>