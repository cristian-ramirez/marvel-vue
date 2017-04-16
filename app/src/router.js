import Vue from 'vue';
import VueRouter from 'vue-router';
import Container from './components/MainContainer.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/:path', component: Container },
];

const router = new VueRouter({
	routes,
});

export default router;
