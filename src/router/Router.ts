import './register-hooks'; // This needs to be included before any components are
import Vue from 'vue';
import VueRouter from 'vue-router';
import { CreateListing } from '../create-listing/CreateListing';
import { Home } from '../home/Home';
import { SearchListings } from '../search-listing/SearchListings';
import { requireLoggedInUserAndTeamGuard } from './guards/RequireLoggedInUserAndTeamGuard';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        { path: '/', component: Home },
        { path: '/search', component: SearchListings, beforeEnter: requireLoggedInUserAndTeamGuard },
        { path: '/create', component: CreateListing, beforeEnter: requireLoggedInUserAndTeamGuard },
        { path: '*', redirect: '/' }
    ]
});
