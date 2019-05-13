/*
API calling list
 */
import ajax from './ajax'
import env from '../../config/env'

const base_url = env.BASE_URL

/**
 * View venues
 * @param url
 */
export const reqVenues = function (params) {
    return ajax(base_url + '/venues', params)
}

export const reqVenueDetail = function (venueId) {
    return ajax(base_url + '/venues/' + venueId)
}
