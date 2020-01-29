import "reflect-metadata";
import Vue from 'vue';
import VueRouter from 'vue-router';
import { App } from './app/App';
import { routes } from './routes';

Vue.use(VueRouter);

new Vue({
    el: '#app',
    template: '<app></app>',
    components: {
        App
    },
    router: new VueRouter({
        routes
    })
});
