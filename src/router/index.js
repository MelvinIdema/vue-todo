import {createRouter, createWebHistory} from 'vue-router'

import Overview from "@/views/Overview.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'overview',
            component: Overview,
            meta: {
                title: 'Todo App - Overview'
            }
        },
        {
            path: '/add',
            name: 'add',
            component: () => import('@/components/CreateTodo.vue'),
            meta: {
                title: 'Todo App - Add Todo'
            }
        }
    ]
})

router.afterEach((to, from) => {
    document.title = to.meta.title || 'Todo App'
});

export default router