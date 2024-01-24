import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import { RouterLink, RouterView } from 'vue-router';
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);
app.use(router);
// register router-link so Primevue doesn't complain
app.component('router-link', RouterLink);
app.component('router-view', RouterView);

app.mount('#app');