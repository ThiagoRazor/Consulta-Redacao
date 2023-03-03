import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login.show',
        component: () => import('../App.vue')
    },
    {
        path: '/redacoes',
        name: 'redacoes.show',
        component: () => import('../views/TelaRedacoes.vue'),
    },
    {
        path: '/redacoes/ver/',
        name: 'verRedacoes.show',
        component: () => import('../views/VisualizarRedacao.vue'),
    },
        {
        path: '/redacoes/edt/',
        name: 'editarRedacoes.show',
        component: () => import('../views/EditarRedacao.vue'),
    },
]


const router = new VueRouter({
    routes
})

export default router;