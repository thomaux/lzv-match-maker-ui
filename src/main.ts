import 'reflect-metadata';
import Vue from 'vue';
import { App } from './app/App';
import { router } from './router/Router';

new Vue({
    el: '#app',
    template: '<app></app>',
    components: {
        App
    },
    router
});
