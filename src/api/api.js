/*
API calling list
 */
import ajax from './ajax'
import env from '../../config/env'

const base_url = env.BASE_URL

// Venues
/**
 * View venues
 * @param params
 */
export const reqVenues = function (params) {
    return ajax(base_url + '/venues', params)
}

/**
 * Post venues
 * @param params
 */
export const postVenues = function (params, header) {
    return ajax(base_url + '/venues', params, 'POST', header)
}

/**
 * Retrieve detailed information about a venue.
 * @param venueId
 */
export const reqVenueDetail = function (venueId) {
    return ajax(base_url + '/venues/' + venueId)
}

/**
 * Change a venue's details.
 * @param venueId
 */
export const patchVenueDetail = function (venueId, params, header) {
    return ajax(base_url + '/venues/' + venueId, params, 'PATCH', header)
}

/**
 * Retrieves all data about venue categories.
 * @param venueId
 */
export const reqCategories = function () {
    return ajax(base_url + '/categories')
}

//venues.photos
/**
 * Add a photo to a venue.
 * @param venueId
 * @param params
 */
export const postVenuesPhoto = function (venueId, params) {
    return ajax(base_url + '/venues/' + venueId + '/photos', params, 'POST')
}

/**
 * Retrieve a given photo for a venue.
 * @param venueId
 * @param photoFilename
 */
export const reqVenuePhoto = function (venueId, photoFilename) {
    return ajax(base_url + '/venues/' + venueId + '/photos/' + photoFilename)
}

/**
 * Delete a venue's photo.
 * @param venueId
 * @param photoFilename
 */
export const deleteVenuesPhoto = function (venueId, photoFilename) {
    return ajax(base_url + '/venues/' + venueId + '/photos/' + photoFilename, {}, 'DELETE')
}

/**
 * Set a photo as the primary one for this venue.
 * @param venueId
 * @param photoFilename
 */
export const setVenuesPrimaryPhoto = function (venueId, photoFilename) {
    return ajax(base_url + '/venues/' + venueId + '/photos/' + photoFilename + 'setPrimary', {}, 'POST')
}


// Reviews
/**
 * Venue Reviews
 * @param venueId
 */
export const reqVenueReviews = function (venueId) {
    return ajax(base_url + '/venues/' + venueId + '/reviews')
}

/**
 * Post a review for a venue.
 * @param venueId
 */
export const postVenueReview = function (venueId, params, header) {
    return ajax(base_url + '/venues/' + venueId + '/reviews', params, 'POST', header)
}

// User Photos
/**
 * Retrieve a user's profile photo.
 * @param userId
 */
export const reqUserPhoto = function (userId) {
    return ajax(base_url + '/users/' + userId +'/photo')
}

/**
 * Set a user's profile photo.
 * @param userId
 */
export const uploadUserPhoto = function (userId, params, header) {
    return ajax(base_url + '/users/' + userId +'/photo', params, 'PUT', header)
}

/**
 * Delete a user's profile photo.
 * @param userId
 */
export const deleteUserPhoto = function (userId, params, header) {
    return ajax(base_url + '/users/' + userId +'/photo', params, 'DELETE', header)
}

// User
/**
 * Retrieve information about a user.
 * @param userId
 */
export const reqUser = function (userId, params, header) {
    return ajax(base_url + '/users/' + userId, params, 'GET', header)
}

/**
 * Change a user's details.
 * @param userId
 */
export const patchUserDetail = function (userId, params, header) {
    return ajax(base_url + '/users/' + userId, params, 'PATCH', header)
}

/**
 * Register as a new user.
 * @param venueId
 * @param params
 */
export const registerUser = function (params) {
    return ajax(base_url + '/users', params, 'POST')
}

/**
 * User Login.
 * @param username
 * @param email
 * @param password
 * @param params
 */
export const userLogin = function (params) {
    return ajax(base_url + '/users/login', params, 'POST')
}

/**
 * User Logout.
 * @param params
 */
export const userLogout = function (params, header) {
    return ajax(base_url + '/users/logout', params, 'POST', header)
}
