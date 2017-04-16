<template>
	<div class="container">
		<b-card
			overlay
			:img="info.thumbnail.path + '.' + info.thumbnail.extension"
			class="mb-2"
		>
			{{info.name}}
		</b-card>
	</div>
</template>

<script>
	export default {
		name: 'card',
		props: {
			info: Object
		},
	}
</script>
