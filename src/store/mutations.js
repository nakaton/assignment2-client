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
    CURRENT_VENUE_REVIEWS,
    LOGIN,
    CURRENT_USER,
    CATEGORIES,
    SELECTED_CITY,
    SEARCH_CONTENT,
    SELECTED_CATEGORY,
    SELECTED_SORT_BY,
    SELECTED_MIN_STAR,
    SELECTED_MAX_COST,
    IS_REVERSE_SORT
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
    },
    [LOGIN](state, {login}){
        state.login = login
    },
    [CURRENT_USER](state, {userId,userToken,isLogin,userPhoto,userName,givenName,familyName,email}){
        localStorage.setItem("currentUser_id",userId);
        localStorage.setItem("currentUser_token",userToken);
        localStorage.setItem("isLogin",isLogin);
        localStorage.setItem("currentUser_photo",userPhoto);
        localStorage.setItem("userName",userName);
        localStorage.setItem("givenName",givenName);
        localStorage.setItem("familyName",familyName);
        localStorage.setItem("email",email);
    },
    [CATEGORIES](state, {categories}){
        state.categories = categories
    },
    [SEARCH_CONTENT](state, {searchContent}){
        state.searchContent = searchContent
    },
    [SELECTED_CITY](state, {selectedCity}){
        state.selectedCity = selectedCity
    },
    [SELECTED_CATEGORY](state, {selectedCategory}){
        state.selectedCategory = selectedCategory
    },
    [SELECTED_MIN_STAR](state, {selectedMinStar}){
        state.selectedMinStar = selectedMinStar
    },
    [SELECTED_MAX_COST](state, {selectedMaxCost}){
        state.selectedMaxCost = selectedMaxCost
    },
    [SELECTED_SORT_BY](state, {selectedSortBy}){
        state.selectedSortBy = selectedSortBy
    },
    [IS_REVERSE_SORT](state, {isReverseSort}){
        state.isReverseSort = isReverseSort
    }
}
