<style lang="scss" src="./assets/app.scss"></style>
<template>
	<div>
		<navmenu></navmenu>
		<router-view></router-view>
	</div>
</template>
<script>
	import navmenu from './components/NavMenu.vue'
	export default {
		name: 'app',
		components: {
			navmenu
		}
	}
</script>
