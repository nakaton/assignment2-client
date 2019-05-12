/*
Vuex actions modules
 */
import {
    reqVenues,
    reqVenueDetail
} from '../api/api'

import {
    RECEIVE_VENUES
} from './mutations-types'

import {BASE_URL} from '../../config/env'

export default {
    async getVenues({commit}) {
        const result = await reqVenues()
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

            // Calculate star count
            result[i].meanStar = starCount(result[i].meanStarRating)
            result[i].modeCost = starCount(result[i].modeCostRating)
        }
        commit(RECEIVE_VENUES, {venues: result})
    }
}

function starCount(value) {
    let star = []
    if (value && value > 0) {
        for(let i = 0; i < (parseInt(value / 1)); i++){
            star.push(1)
        }
        if(value % 1 >= 0.5 && star.length < 5){
            star.push(0.5)
        }
        for(let j = 0; j <= (5 - star.length); j++) {
            star.push(0)
        }
    } else {
        star = [0, 0, 0, 0, 0]
    }
    return star
}
