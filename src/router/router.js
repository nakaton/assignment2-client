/*
Router Define
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import Venues from '../pages/Venues/Venues'
import Login from '../pages/Login/Login'
import MyVenues from '../pages/MyVenues/MyVenues'
import MyProfile from '../pages/MyProfile/MyProfile'

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
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Login
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
        },
        {
            path: '/myVenues',
            name: 'myVenues',
            component: MyVenues
        },
        {
            path: '/myVenues/:venueId',
            name: 'myVenuesDetail',
            component: MyVenues
        },
        {
            path: '/myProfile',
            name: 'myProfile',
            component: MyProfile
        }
    ]
})
