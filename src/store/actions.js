/*
Vuex actions modules
 */
import {
    reqVenues,
    reqVenueDetail,
    reqVenueReviews
} from '../api/api'

import {
    RECEIVE_VENUES,
    GROUP_PAGE_VENUES,
    CURRENT_PAGE_VENUES,
    PAGE_LOADING,
    CURRENT_VENUE_DETAIL,
    CURRENT_VENUE_REVIEWS
} from './mutations-types'

import {BASE_URL} from '../../config/env'

export default {
    /**
     * Get all venues data
     * @param commit
     * @param params
     * @returns {Promise<void>}
     */
    async getVenues({commit}, params) {
        commit(PAGE_LOADING, {pageLoading: true})

        const pageSize = params.pageSize
        const result = await reqVenues(params)
        for (let i = 0; i < result.length; i++) {
            // Get photo's link
            if (result[i].primaryPhoto) {
                result[i].src = BASE_URL + '/venues/' + result[i].venueId
                    + '/photos/' + result[i].primaryPhoto;
            } else {
                result[i].src = 'src/pages/Venues/images/default.png'
            }

            // Get Category name
            if (result[i].venueId) {
                let venueDetail = await reqVenueDetail(result[i].venueId);
                result[i].categoryName = venueDetail.category.categoryName;
            }
        }

        let pageNum = Math.ceil(result.length / pageSize) || 1;
        console.log("pageNum: " + pageNum)

        let groupPageVenues = []

        for (let i = 0; i < pageNum; i++) {
            //Slice data into group for each page
            groupPageVenues[i] = result.slice(pageSize * i, pageSize * (i + 1))
        }

        commit(RECEIVE_VENUES, {venues: result})
        commit(GROUP_PAGE_VENUES, {groupPageVenues: groupPageVenues})
        commit(CURRENT_PAGE_VENUES, {currentPageVenues: groupPageVenues[0]})
        commit(PAGE_LOADING, {pageLoading: false})
    },

    /**
     * Get Venue Detail and Reviews
     * @param commit
     * @param params
     * @returns {Promise<void>}
     */
    async getVenueDetail({commit}, params) {
        commit(PAGE_LOADING, {pageLoading: true})

        const venueId = params.id;
        const starRate = params.meanStarRating;
        const costRate = params.modeCostRating;
        const venueDetail = await reqVenueDetail(venueId);

        if (venueDetail){
            venueDetail.meanStarRating = starRate;
            venueDetail.modeCostRating = costRate;

            for (let i = 0; i < venueDetail.photos.length; i++) {
                // Get photo's link
                if (venueDetail.photos[i].photoFilename) {
                    venueDetail.photos[i].src = BASE_URL + '/venues/' + venueId
                        + '/photos/' + venueDetail.photos[i].photoFilename;
                } else {
                    venueDetail.photos[i].src = 'src/pages/Venues/images/default.png'
                }
            }
        }

        //Get Reviews
        let venueReviews = await reqVenueReviews(venueId);

        venueReviews.sort(keySort('timePosted', true));

        commit(CURRENT_VENUE_DETAIL, {currentVenueDetail: venueDetail})
        commit(PAGE_LOADING, {pageLoading: false})
        commit(CURRENT_VENUE_REVIEWS, {currentVenueReviews: venueReviews})
    }
}
/**
 * Sort Array by key column
 * @param key
 * @param reverseSort true for "DESC"；false for "ASC"
 */
function keySort(key,reverseSort){
    return function(a,b){
        return reverseSort ? ((a[key] > b[key]) ? 1 : -1) : ((b[key] > a[key]) ? 1 : -1);
    }
}
