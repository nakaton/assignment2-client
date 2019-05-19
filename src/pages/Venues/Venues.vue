<template>
    <div>
        <Search/>
        <VenueDetail v-show="!showVenues"/>
        <div v-show="showVenues" v-loading="this.pageLoading" style="z-index: 1">
            <div class="listing-summaries-wrapper">
                <div class="listing-summaries" style="transform: translateX(0px)">
                    <div class="listing-summary" v-for="item in this.currentPageVenues">
                        <router-link :to="{name : 'venueDetail', params:{venueId: item.venueId}}">
                            <a v-on:click="onRouterLinkClick(item.venueId, item.meanStarRating, item.modeCostRating)">
                                <div class="wrapper">
                                    <div id="photo" class="thumbnail">
                                        <img :src='item.src' class="thumbnail"/>
                                    </div>
                                    <div class="info title">
                                        <span>{{item.venueName}} | {{item.city}}</span>
                                    </div>
                                    <div class="info description">
                                        <span>Category : {{item.categoryName}}</span>
                                    </div>
                                    <div class="info description">
                                        Description : {{item.shortDescription}}
                                    </div>
                                    <div>
                                        <div class="info description star-div">Star Rate:</div>
                                        <div class="star-div">
                                            <el-rate
                                                v-model="item.meanStarRating || 3"
                                                disabled
                                                text-color="#909399">
                                            </el-rate>
                                        </div>
                                        <div class="info description cost-div">
                                            Cost Rate:
                                            <span style="color: #ff9900;">{{item.modeCostRating || 0.0}} $</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </router-link>
                    </div>
                </div>
            </div>
            <Pagination/>
        </div>
    </div>
</template>

<script>
    import Search from '../../components/Search/Search.vue'
    import Pagination from '../../components/Pagination/Pagination.vue'
    import VenueDetail from '../VenueDetail/VenueDetail.vue'
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'
    import {
        LOGIN
    } from '../../store/mutations-types'

    export default {
        name: "Venues",
        data (){
            return{
                error: "",
                errorFlg: false,
                showVenues: true,
                currentPageNum: 1
            }
        },
        mounted (){
            let params = {}
            params.pageSize = this.pageSize
            if(this.searchContent != "" && this.searchContent != undefined){
                params.q = this.searchContent
            }
            if(this.selectedCity != "" && this.selectedCity != undefined){
                params.city = this.selectedCity
            }
            if(this.selectedCategory != "" && this.selectedCategory != undefined){
                params.categoryId = this.selectedCategory
            }
            if(this.selectedMinStar != "" && this.selectedMinStar != undefined){
                params.minStarRating = this.selectedMinStar
            }
            if(this.selectedMaxCost != "" && this.selectedMaxCost != undefined){
                params.maxCostRating = this.selectedMaxCost
            }
            if(this.selectedSortBy != "" && this.selectedSortBy != undefined){
                params.sortBy = this.selectedSortBy
            }
            if(this.isReverseSort == true){
                params.reverseSort = this.isReverseSort
            }
            this.getVenues(params);
            if(localStorage.getItem("isLogin") == 'true'){
                // alert("true")
                this.$store.commit(LOGIN, {login: true});
            }
        },
        computed:{
            ...mapState(["venues"]),
            ...mapState(["pageSize"]),
            ...mapState(["currentPageVenues"]),
            ...mapState(["pageLoading"]),
            ...mapState(["searchContent"]),
            ...mapState(["selectedCity"]),
            ...mapState(["selectedCategory"]),
            ...mapState(["selectedMinStar"]),
            ...mapState(["selectedMaxCost"]),
            ...mapState(["selectedSortBy"]),
            ...mapState(["isReverseSort"]),
        },
        methods: {
            ...mapActions(['getVenues']),
            ...mapActions(['getVenueDetail']),

            onRouterLinkClick: function (venueId, meanStarRating, modeCostRating) {
                this.showVenues = false
                this.getVenueDetail({id: venueId, meanStarRating: meanStarRating, modeCostRating: modeCostRating});
            }
        },
        components:{
            Search,
            Pagination,
            VenueDetail
        }
    }
</script>

<style scoped>
    .listing-summaries-wrapper {
        padding-top: 57px;
        overflow: hidden;
    }
    .listing-summaries {
        display: grid;
        grid-gap: 30px;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        /*grid-template-rows: 260px 260px 260px 260px;*/
        margin: 0px;
        padding: 0 25px;
    }
    .listing-summary {
        flex: 0 0 auto;
        position: relative;
    }
    .listing-summary a{
        color: #484848;
        letter-spacing: .5px;
        cursor: pointer;
        align-items: center;
        text-decoration: none;
    }
    .thumbnail {
        width: 270px;
        height: 195px;
        background-size: cover;
        background-position: 50%;
        border-radius: 4px
    }

    .wrapper {
        max-width: 270px;
        display: block;
    }
    .info.title {
        padding-top: 5px;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
    }

    .info {
        color: #484848;
        word-wrap: break-word;
        letter-spacing: .2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .info.description {
        font-size: 14px;
        line-height: 18px;
    }
    .star-div {
        display: inline-block;
        float: left;
    }
    .cost-div {
        /*display: inline-block;*/
        float: left;
    }

</style>
