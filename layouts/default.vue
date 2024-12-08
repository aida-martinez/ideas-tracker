<template>
	<div>
		<Navbar />
		<div>
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	layout: "default",
};
</script>
