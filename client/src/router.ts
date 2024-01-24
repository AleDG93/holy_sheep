import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import Game from './pages/Game.vue';
import Homepage from './pages/Homepage.vue';


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Homepage,
    },
    {
        path: '/game',
        component: Game,
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;