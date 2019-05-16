<template>
    <div class="listing-container">
        <Search/>
        <div style="padding-top: 55px;">
            <h3>My Venues</h3>
        </div>
        <div style="border: 1px solid #EBEBEB">
            <div v-for="item in this.currentPageVenues">
                <div class="listing-div">
                    <div id="photo" class="thumbnail">
                        <img :src='item.src' class="thumbnail"/>
                    </div>
                    <div>
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
                                    v-model="item.meanStarRating"
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
                    <div style="display:flex; align-items:center">
                        <el-button>Edit</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>Venue Detail</h3>
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
            this.getVenues({pageSize: this.pageSize});
            if(localStorage.getItem("isLogin") == 'true'){
                // alert("true")
                this.$store.commit(LOGIN, {login: true});
            }
            // this.$router.push('/venues');
        },
        computed:{
            ...mapState(["venues"]),
            ...mapState(["pageSize"]),
            ...mapState(["currentPageVenues"]),
            ...mapState(["pageLoading"])
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
    .listing-container{
        width:60%;
        margin: 0 auto;
    }
    .listing-div{
        display: grid;
        border: 1px solid #EBEBEB;
        grid-gap: 10px;
        grid-template-columns: 20% auto 10%;
    }
    a{
        color: #484848;
        letter-spacing: .5px;
        cursor: pointer;
        align-items: center;
        text-decoration: none;
    }
    .thumbnail {
        width: 162px;
        height: 117px;
        background-size: cover;
        border-radius: 4px
    }
    .info.title {
        padding-top: 10px;
        padding-bottom: 10px;
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
        /*display: inline-block;*/
        float: left;
    }
    .cost-div {
        /*display: inline-block;*/
        float: left;
    }

</style>
