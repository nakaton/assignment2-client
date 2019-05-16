/*
Router Define
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Venues from '../pages/Venues/Venues'
import Login from '../pages/Login/Login'

Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/venues'
        },
        {
            path: '/login',
            name: 'login',
            component: Venues
        },
        {
            path: '/register',
            name: 'register',
            component: Venues
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
