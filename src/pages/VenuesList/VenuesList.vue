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
                        <!--<span>venueId:{{item.venueId}}</span><br>-->
                        <!--<span>venueName:{{item.venueName}}</span>-->
                        <!--<span>categoryId:{{item.categoryId}}</span>-->
                        <!--<span>city:{{item.city}}</span>-->
                        <!--<span>shortDescription:{{item.shortDescription}}</span>-->
                        <!--<span>latitude:{{item.latitude}}</span>-->
                        <!--<span>longitude:{{item.longitude}}</span>-->
                        <!--<span>meanStarRating:{{item.meanStarRating}}</span>-->
                        <!--<span>modeCostRating:{{item.modeCostRating}}</span>-->
                        <!--<span>primaryPhoto:{{item.primaryPhoto}}</span>-->
                        <!--<span>distance{{item.distance}}</span>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Search from '../../components/Search/Search.vue'
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
            Search
        }
    }
</script>

<style scoped>
    .grid {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        /*grid-template-rows: 25% 100px auto;*/
        margin: 30px;

        /*grid-template-columns: 100px 50px 100px;*/
        /*grid-template-rows: 80px auto 80px;*/
        /*grid-gap: 10px 15px;*/
    }
    .listing-summaries-wrapper {
        overflow: hidden;
    }
    .listing-summaries {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        transition: transform .5s;
        padding: 0 25px;
    }
    .listing-summary {
        flex: 0 0 auto;
        position: relative;
    }

    .thumbnail {
        width: 280px;
        height: 200px;
        background-size: cover;
        background-position: 50%;
    }

    .wrapper {
        /*display: grid;*/
        max-width: 280px;
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
