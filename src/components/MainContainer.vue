<template>
	<div class="container padding-container">
		<div class="row">
			<div class="col-md-6">
				<div class="row" v-for="(item, index) in results" v-if="index % 2 === 0">
					<card :info="item"></card>
				</div>
			</div>
			<div class="col-md-6">
				<div class="row" v-for="(item, index) in results" v-if="index % 2 !== 0">
					<card :info="item"></card>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-4  mx-auto">
				<b-pagination
					size="md"
					:total-rows="100"
					variant="primary"
					secondary-variant="info"
					v-model="currentPage"
					:per-page="10"
				>
				</b-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import card from './Card.vue';
	import Api from '../resources/api';
	const api = new Api();

	export default {
		name:'maincontainer',
		components: {
			card
		},
		watch: {
			'$route': 'fetchData',
			currentPage (val, oldVal) {
				if (val !== oldVal) {
					this.fetchData();
				}
			}
		},
		methods: {
			fetchData () {
				const {path} = this.$route.params;
				const page = this.currentPage;
				api.get(path, page)
					.then(response => {
						this.results = response.data.data;
					})
					.catch(error => console.log(error));
			}
		},
		data () {
			return {
				currentPage: 1,
				results: []
			}
		},
		created () {
			this.fetchData();
		},
	}
</script>
