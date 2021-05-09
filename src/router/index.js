import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import("../views/home.vue")
	},
	{
		path: '/add',
		name: 'todo-add',
		component: () => import("../views/todo-add.vue")
	},
	{
		path: '/edit/:id',
		name: 'todo-edit',
		component: () => import("../views/todo-edit.vue")
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
