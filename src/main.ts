import 'reflect-metadata';
import 'vue-class-component/hooks';
import Vue from 'vue';
import { App } from './app/App';
import { router } from './router/Router';
import { vuetify } from './vuetify';

new Vue({
    el: '#app',
    template: '<app></app>',
    components: {
        App
    },
    router,
    vuetify
});
