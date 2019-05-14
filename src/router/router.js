/*
Router Define
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Venues from '../pages/Venues/Venues'
import VenueDetail from '../pages/VenueDetail/VenueDetail'

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/venues'
        },
        {
            path: '/venues',
            name: 'venues',
            component: Venues
        },
        {
            path: '/venues/:venueId',
            name: 'venueDetail',
            component: Venues
        }
    ]
})
