<script setup>
import { defineProps } from 'vue'

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
</script>

<template>
		<form class="bg-pale border border-pink/20 rounded-xl p-8" @submit.prevent="handleSubmit">
		<ul class="form-list">
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