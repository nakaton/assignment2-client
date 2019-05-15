/*
API calling list
 */
import ajax from './ajax'
import env from '../../config/env'

const base_url = env.BASE_URL

/**
 * View venues
 * @param params
 */
export const reqVenues = function (params) {
    return ajax(base_url + '/venues', params)
}

/**
 * View venue detail
 * @param venueId
 */
export const reqVenueDetail = function (venueId) {
    return ajax(base_url + '/venues/' + venueId)
}

/**
 * Venue Reviews
 * @param venueId
 */
export const reqVenueReviews = function (venueId) {
    return ajax(base_url + '/venues/' + venueId +'/reviews')
}
