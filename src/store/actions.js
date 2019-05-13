/*
Vuex actions modules
 */
import {
    reqVenues,
    reqVenueDetail
} from '../api/api'

import {
    RECEIVE_VENUES,
    GROUP_PAGE_VENUES,
    CURRENT_PAGE_VENUES,
    PAGE_LOADING
} from './mutations-types'

import {BASE_URL} from '../../config/env'

export default {
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
                result[i].src = 'src/pages/VenuesList/images/default.png'
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
    }
}
