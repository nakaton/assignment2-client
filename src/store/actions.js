/*
Vuex actions modules
 */
import {
    reqVenues,
    reqVenueDetail,
    reqVenueReviews,
    reqUserPhoto,
    registerUser,
    userLogin,
    userLogout,
    reqCategories,
    patchVenueDetail,
    postVenues,
    postVenueReview,
    reqUser,
    patchUserDetail,
    uploadUserPhoto,
    deleteUserPhoto,
    postVenuesPhoto,
    deleteVenuesPhoto,
    setVenuesPrimaryPhoto
} from '../api/api'

import {
    RECEIVE_VENUES,
    GROUP_PAGE_VENUES,
    CURRENT_PAGE_VENUES,
    PAGE_LOADING,
    CURRENT_VENUE_DETAIL,
    CURRENT_VENUE_REVIEWS,
    LOGIN,
    CURRENT_USER,
    CATEGORIES
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

            //Distance
            if(result[i].distance != "" && result[i].distance != undefined) {
                result[i].distance = result[i].distance.toFixed(2)
            }

            // Translate Cost Rating
            switch (result[i].modeCostRating) {
                case 0:
                    result[i].modeCostRating = "Free"
                    break
                case 1:
                    result[i].modeCostRating = "$"
                    break
                case 2:
                    result[i].modeCostRating = "$$"
                    break
                case 3:
                    result[i].modeCostRating = "$$$"
                    break
                case 4:
                    result[i].modeCostRating = "$$$$"
                    break
                default:
                    result[i].modeCostRating = "Free"
            }

            // Get venue detail info
            if (result[i].venueId) {
                let venueDetail = await reqVenueDetail(result[i].venueId);
                result[i].categoryName = venueDetail.category.categoryName;
                result[i].longDescription = venueDetail.longDescription;
                result[i].address = venueDetail.address;

                let photos = []
                for(let j =0; j< venueDetail.photos.length; j++) {
                    const name = venueDetail.photos[j].photoFilename;
                    const url = BASE_URL + '/venues/' + result[i].venueId + '/photos/' + venueDetail.photos[j].photoFilename;
                    const photoDescription = venueDetail.photos[j].photoDescription
                    const isPrimary = venueDetail.photos[j].isPrimary
                    photos.push({name: name, url: url, photoDescription: photoDescription, isPrimary: isPrimary})
                }
                result[i].photos = photos

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
        const distance = params.distance;

        const venueDetail = await reqVenueDetail(venueId);

        if (venueDetail){
            venueDetail.venueId = venueId;
            venueDetail.meanStarRating = starRate;
            venueDetail.modeCostRating = costRate;
            venueDetail.distance = distance;

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

        for (let i = 0; i < venueReviews.length; i++) {

            //Get Reviewer Photo
            try{
                let userPhoto = await reqUserPhoto(venueReviews[i].reviewAuthor.userId);
                venueReviews[i].userPhotoSrc = BASE_URL + '/users/' + venueReviews[i].reviewAuthor.userId + '/photo';
            }catch (e) {
                venueReviews[i].userPhotoSrc = 'src/pages/Venues/images/default.png';
            }

            // Translate Cost Rating
            switch (venueReviews[i].costRating) {
                case 0:
                    venueReviews[i].costRating = "Free"
                    break
                case 1:
                    venueReviews[i].costRating = "$"
                    break
                case 2:
                    venueReviews[i].costRating = "$$"
                    break
                case 3:
                    venueReviews[i].costRating = "$$$"
                    break
                case 4:
                    venueReviews[i].costRating = "$$$$"
                    break
                default:
                    venueReviews[i].costRating = "Free"
            }

            //Get Reviewer Profile
            try{
                let header = {
                    headers: {'X-Authorization':null}
                }

                let paramsForProfile = {
                    id: venueReviews[i].reviewAuthor.userId
                }
                const userProfile = await reqUser(venueReviews[i].reviewAuthor.userId, paramsForProfile, header)
                venueReviews[i].reviewAuthor.givenName = userProfile.givenName
                venueReviews[i].reviewAuthor.familyName = userProfile.familyName
                venueReviews[i].reviewAuthor.email = userProfile.email

            }catch (e) {

            }
        }

        // venueReviews.sort(keySort('timePosted', false));

        commit(CURRENT_VENUE_DETAIL, {currentVenueDetail: venueDetail})
        commit(PAGE_LOADING, {pageLoading: false})
        commit(CURRENT_VENUE_REVIEWS, {currentVenueReviews: venueReviews})
    },

    /**
     * User Login
     * @param commit
     * @param params
     * @returns {Promise<void>}
     */
    async userLogin({commit}, params) {
        commit(PAGE_LOADING, {pageLoading: true})

        let userPhoto  = 'src/pages/Venues/images/default.png';

        try{
            const loginResult = await userLogin(params)
            try{
                let result = await reqUserPhoto(loginResult.userId);
                userPhoto  = BASE_URL + '/users/' + loginResult.userId + '/photo';
            }catch (e) {
                userPhoto  = 'src/pages/Venues/images/default.png';
            }

            //Get login user profile
            let header = {
                headers: {'X-Authorization':loginResult.token}
            }

            let paramsForProfile = {
                id: loginResult.userId
            }
            const userProfile = await reqUser(loginResult.userId, paramsForProfile, header)

            commit(LOGIN, {login: true})
            commit(CURRENT_USER, {userId: loginResult.userId, userToken:loginResult.token,
                isLogin:true, userPhoto: userPhoto, userName: userProfile.username,
                givenName: userProfile.givenName, familyName: userProfile.familyName, email: userProfile.email})
            commit(PAGE_LOADING, {pageLoading: false})
        }catch (e) {
            console.log(e)
            throw e
        }

    },

    /**
     * User Logout
     * @param commit
     * @param params
     * @returns {Promise<void>}
     */
    async userLogout({commit}, params) {
        commit(PAGE_LOADING, {pageLoading: true})
        try{
            // alert(params.headers)
            const logoutResult = await userLogout({}, params)

            commit(LOGIN, {login: false})
            commit(CURRENT_USER, {userId: "", userToken:"", userPhoto: 'src/pages/Venues/images/default.png',
                userName: "", givenName: "", familyName: "", email: ""})
            commit(PAGE_LOADING, {pageLoading: false})
        }catch (e) {
            console.log(e)
            throw e
        }

    },

    /**
     * User Register
     * @param commit
     * @param params
     * @returns {Promise<void>}
     */
    async userRegister({commit}, params) {
        commit(PAGE_LOADING, {pageLoading: true})
        try {
            // debugger
            const userId = await registerUser(params)
            // debugger
            commit(PAGE_LOADING, {pageLoading: false})
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Change a user's details.
     * @param commit
     * @returns {Promise<void>}
     */
    async patchUserDetail({commit}, params) {
        try {
            const userId = params.userId
            const header = params.header
            const profile = params.profile

            const result = await patchUserDetail(userId, profile, header)
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Retrieves all data about venue categories.
     * @param commit
     * @returns {Promise<void>}
     */
    async getCategories({commit}) {
        try {
            const categories = await reqCategories()
            commit(CATEGORIES, {categories: categories})
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Change a venue's details
     * @param commit
     * @returns {Promise<void>}
     */
    async patchVenueDetail({commit}, params) {
        try {
            const venueId = params.venueId
            const header = params.header

            const result = await patchVenueDetail(venueId, params, header)
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Add a new venue.
     * @param commit
     * @returns {Promise<void>}
     */
    async addVenue({commit}, params) {
        try {
            const header = params.header

            const venueId = await postVenues(params, header)
            return venueId
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Post a review for a venue.
     * @param commit
     * @returns {Promise<void>}
     */
    async postVenueReview({commit}, params) {
        try {
            const venueId = params.venueId
            const header = params.header
            const review = params.review

            const result = await postVenueReview(venueId, review, header)
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Set a user's profile photo.
     * @param commit
     * @returns {Promise<void>}
     */
    async uploadUserPhoto({commit}, params) {
        try {
            const userId = params.userId
            const header = params.header
            const file = params.file

            const result = await uploadUserPhoto(userId, file, header)
            const userPhoto = BASE_URL + '/users/' + userId + '/photo'
            localStorage.setItem("currentUser_photo", userPhoto)
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Delete a user's profile photo.
     * @param commit
     * @returns {Promise<void>}
     */
    async deleteUserPhoto({commit}, params) {
        try {
            const userId = params.userId
            const header = params.header

            const result = await deleteUserPhoto(userId, {}, header)
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Add a photo to a venue.
     * @param commit
     * @returns {Promise<void>}
     */
    async uploadVenuePhoto({commit}, params) {
        try {
            const venueId = params.venueId
            const header = params.header
            const formData = params.formData

            const result = await postVenuesPhoto(venueId, formData, header)
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Delete a venue's photo.
     * @param commit
     * @returns {Promise<void>}
     */
    async deleteVenuePhoto({commit}, params) {
        try {
            const venueId = params.venueId
            const photoFilename = params.photoFilename
            const header = params.header

            const result = await deleteVenuesPhoto(venueId, photoFilename, header)
        }catch (e) {
            console.log(e)
            throw e
        }
    },

    /**
     * Set a photo as the primary one for this venue.
     * @param commit
     * @returns {Promise<void>}
     */
    async setVenuesPrimaryPhoto({commit}, params) {
        try {
            const venueId = params.venueId
            const photoFilename = params.photoFilename
            const header = params.header

            const result = await setVenuesPrimaryPhoto(venueId, photoFilename, header)
        }catch (e) {
            console.log(e)
            throw e
        }
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
