/*
Vuex Mutation module
 */
import Vue from 'vue'
import {
    RECEIVE_VENUES,
    GROUP_PAGE_VENUES,
    CURRENT_PAGE_VENUES,
    PAGE_LOADING,
    CURRENT_VENUE_DETAIL,
    CURRENT_VENUE_REVIEWS
} from './mutations-types'

export default {
    [RECEIVE_VENUES](state, {venues}){
        state.venues = venues
    },
    [GROUP_PAGE_VENUES](state, {groupPageVenues}){
        state.groupPageVenues = groupPageVenues
    },
    [CURRENT_PAGE_VENUES](state, {currentPageVenues}){
        state.currentPageVenues = currentPageVenues
    },
    [PAGE_LOADING](state, {pageLoading}){
        state.pageLoading = pageLoading
    },
    [CURRENT_VENUE_DETAIL](state, {currentVenueDetail}){
        state.currentVenueDetail = currentVenueDetail
    },
    [CURRENT_VENUE_REVIEWS](state, {currentVenueReviews}){
        state.currentVenueReviews = currentVenueReviews
    }
}
