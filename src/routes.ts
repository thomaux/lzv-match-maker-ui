import { RouteConfig } from 'vue-router';
import { CreateListing } from './create-listing/CreateListing';
import { Home } from './home/Home';
import { SearchListings } from './search-listing/SearchListings';

export const routes: RouteConfig[] = [
    { path: '/', component: Home },
    { path: '/search', component: SearchListings },
    { path: '/create', component: CreateListing }
];
