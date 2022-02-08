import { createApp } from 'vue';
import VueAuth0Plugin from 'vue-auth0-plugin';
import App from './App.vue';

const app = createApp(App);
app.use(VueAuth0Plugin, {
    domain: 'lzv-dev.eu.auth0.com',
    client_id: 'REqP5bFgWsdFy9u30lhSiDD9qZPORmzz',
    redirect_uri: 'http://localhost:1337',
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
});
app.mount('#app');
