<script setup>
import { SquareMinus, Pencil } from 'lucide-vue-next';

const ideas = useIdeas();
const user = useUserSession();

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'

function handleUpdate(idea) {
	console.log('form submitted', idea);
	
	ideas.edit(idea.$id);
}
</script>

<template>
	<section>
		<article>
			<h4 class="title-section">Your Ideas</h4>

			<ul class="space-y-4">
				<template v-if="ideas.current.value && ideas.current.value.length">
					<li v-for="idea in ideas.current.value" class="">
						<div class="relative bg-purple/10 py-4 px-6 rounded-xl">
							<h5 class="text-xl">{{ idea.title }}</h5>
							<p class="text-base">{{ idea.description }}</p>

							<div class="absolute top-3 right-3 space-x-4">
								<Drawer>
									<DrawerTrigger>
										<button class="" aria-label="Update item" v-if="user.current.value &&
											idea.userId === user.current.value.userId
											" type="button" title="Update item">
											<Pencil />
										</button>
									</DrawerTrigger>
									<DrawerContent class="w-6/12 mx-auto">
										<form @submit.prevent="handleUpdate(idea)">
											<DrawerHeader>
												<DrawerTitle class="mb-4">Edit idea</DrawerTitle>
												<DrawerDescription class="form-list">
													<div>
														<label class="label">Title</label>
														<input type="text" :value="idea.title" name="title" aria-label="title"/>
													</div>
													<div>
														<label class="label">Description</label>
														<textarea :value="idea.description" name="description" />
													</div>
												</DrawerDescription>
											</DrawerHeader>
											<DrawerFooter>
												<button type="submit" class="button w-fit mx-auto">Submit</button>
												<DrawerClose>
													<button type="button" class="button-outline">
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