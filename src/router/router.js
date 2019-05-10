/*
Router Define
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import VenuesList from '../pages/VenuesList/VenuesList'

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/venueslist'
        },
        {
            path: '/venueslist',
            component: VenuesList
        }
    ]
})
