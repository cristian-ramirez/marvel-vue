<template>
	<b-navbar toggleable type="inverse" variant="success">
		<b-nav-toggle target="nav_collapse"></b-nav-toggle>
		<b-link class="navbar-brand" to="/">
			<span>Marvel Vue</span>
		</b-link>
		<b-collapse is-nav id="nav_collapse">
			<b-nav is-nav-bar>
				<router-link
					class="nav-link capitalize"
					v-for="item in navItems"
					:key="item"
					:to="item"
				>
					{{item}}
				</router-link>
			</b-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
	export default {
		name: 'navmenu',
		data () {
			return {
					navItems: [
						'characters',
						'comics',
						'events',
						'series',
						'stories',
					]
			};
		},
	};
</script>
