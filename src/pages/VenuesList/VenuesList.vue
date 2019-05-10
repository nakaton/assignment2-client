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
                            <span>venueName:{{item.venueName}}</span>
                        </div>
                        <div class="info title">
                            <span>category:{{item.categoryName}}</span>
                        </div>
                        <div>
                            <span>city:{{item.city}}</span>
                            <span>meanStarRating:{{item.meanStarRating}}</span>
                            <span>modeCostRating:{{item.modeCostRating}}</span>
                        </div>
                        <div class="info description">
                            shortDescription:{{item.shortDescription}}
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

    const env = require('../../../config/env');

    export default {
        name: "VenuesList",
        data (){
            return{
                error: "",
                errorFlg: false,
                venues: [],
                categoryName: ""
            }
        },
        mounted: function(){
            // this.getVenuesList();
        },
        methods: {
            getVenuesList: function () {
                this.$http.get(env.BASE_URL + '/venues')
                    .then(function (response) {
                        this.venues = response.data;

                        for (let i = 0; i < this.venues.length; i++){
                            if (this.venues[i].primaryPhoto){
                                this.venues[i].src = env.BASE_URL + '/venues/' + this.venues[i].venueId
                                    + '/photos/' + this.venues[i].primaryPhoto;
                                // alert(this.venues[i].src)
                            }else{
                                this.venues[i].src = 'src/pages/VenuesList/images/default.png'
                            }
                            this.venues[i].categoryName = "";
                            if(this.venues[i].venueId){
                                this.$http.get(env.BASE_URL + '/venues/' + this.venues[i].venueId)
                                    .then(function (response) {
                                        // debugger
                                        // alert(response.data.category.categoryName)
                                        this.venues[i].categoryName = response.data.category.categoryName;
                                        // alert(this.venues[i].categoryName)
                                    }, function (error) {
                                        this.error = error;
                                        this.errorFlg = true;
                                    });
                                // this.venues[i].categoryName = this.categoryName;
                                alert(this.venues[i].categoryName) // 异步调用的同步性问题
                            }else{
                                this.venues[i].categoryName = "";
                            }
                        }
                    }, function (error) {
                        this.error = error;
                        this.errorFlg = true;
                    });
            }
        },
        components:{
            Search
        }
    }
</script>

<style scoped>
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
        width: 350px;
        height: 250px;
        background-size: cover;
        background-position: 50%;
    }

    .wrapper {
        max-width: 350px;
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

</style>
