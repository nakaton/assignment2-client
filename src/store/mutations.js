/*
Vuex Mutation module
 */
import Vue from 'vue'
import {
    RECEIVE_VENUES
} from './mutations-types'

export default {
    [RECEIVE_VENUES](state, {venues}){
        state.venues = venues
    }
}
