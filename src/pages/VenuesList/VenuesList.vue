<template>
    <div>
        <Search/>
        <div class="listing-summaries-wrapper">
            <div class="listing-summaries" style="transform: translateX(0px)">
                <div class="listing-summary" v-for="item in this.venues">
                    <div class="wrapper">
                        <div id="photo" class="thumbnail">
                            <!--<img src='./images/venue_back.svg'/>-->
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
                            <div class="star-div" v-for="star in item.meanStar">
                                <div>
                                    <img class="star" v-if="star === 1" src="src/components/Star/images/star24_on@2x.png"/>
                                </div>
                                <div>
                                    <img class="star" v-if="star === 0.5" src="src/components/Star/images/star24_half@2x.png"/>
                                </div>
                                <div>
                                    <img class="star" v-if="star === 0" src="src/components/Star/images/star24_off@2x.png"/>
                                </div>
                            </div>
                            <div class="info description star-div">&nbsp&nbsp&nbsp&nbsp&nbspCost Rate:</div>
                            <div class="star-div" v-for="star in item.modeCost">
                                <div>
                                    <img class="star" v-if="star === 1" src="src/components/Star/images/star24_on@2x.png"/>
                                </div>
                                <div>
                                    <img class="star" v-if="star === 0.5" src="src/components/Star/images/star24_half@2x.png"/>
                                </div>
                                <div>
                                    <img class="star" v-if="star === 0" src="src/components/Star/images/star24_off@2x.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Pagination/>
    </div>
</template>

<script>
    import Search from '../../components/Search/Search.vue'
    import Pagination from '../../components/Pagination/Pagination.vue'
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'

    export default {
        name: "VenuesList",
        data (){
            return{
                error: "",
                errorFlg: false,
            }
        },
        mounted (){
            this.getVenues()
        },
        computed:{
            ...mapState(["venues"])
        },
        methods: {
            ...mapActions(['getVenues'])
        },
        components:{
            Search,
            Pagination
        }
    }
</script>

<style scoped>
    .listing-summaries-wrapper {
        overflow: hidden;
    }
    .listing-summaries {
        display: grid;
        grid-gap: 30px;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        grid-template-rows: 260px 260px 260px 260px;
        margin: 10px;
        padding: 0 25px;
    }
    .listing-summary {
        flex: 0 0 auto;
        position: relative;
    }

    .thumbnail {
        width: 270px;
        height: 195px;
        background-size: cover;
        background-position: 50%;
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

    .star {
        float: left;
        width: 13px;
        height: 13px;
        /*display: flex;*/
        /*flex-direction: row;*/
    }
    .star-div {
        display: inline-block;
        float: left;
    }

</style>
