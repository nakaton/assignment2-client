<template>
    <div v-loading="this.pageLoading" class="venue-detail-container">
        <div class="carousel-div">
            <el-carousel indicator-position="outside" height="350px">
                <el-carousel-item v-for="item in this.currentVenueDetail.photos" :key="item.photoFilename">
                    <div class="full-photo-div" v-bind:style="{backgroundImage:'url(' + item.src + ')'}"
                         v-on:click="bigPhotoVisible = true; imageSrc = item.src; photoDescription = item.photoDescription">
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div>
            <el-dialog
                :visible.sync="bigPhotoVisible"
                :title="'Description : ' + photoDescription"
                width="60%">
                <img :src='imageSrc' class="full-photo"/>
            </el-dialog>
        </div>
        <div class="back-button">
            <router-link :to="{ name : 'venues'}">
                <div>
                    <a v-on:click="onRouterLinkClick">
                        <el-button type="info" icon="el-icon-back" plain class="back-button"></el-button>
                    </a>
                </div>
            </router-link>
        </div>

        <div v-show="!this.pageLoading" class="listing-container">
            <div id="venue_detail" class="info">
                <div class="info title">
                    <span>{{this.currentVenueDetail.venueName}} | {{this.currentVenueDetail.city}}</span>
                </div>
                <div>
                    <el-tag type="success" size="mini">{{this.currentVenueDetail.category.categoryName}}</el-tag>
                    <span class="info description">&nbsp;({{this.currentVenueDetail.category.categoryDescription}})</span>
                </div>
                <div style="padding-bottom: 10px">
                    <span class="info description el-icon-location-information">/{{this.currentVenueDetail.address}}</span>
                    <span class="info description">&nbsp;&nbsp;({{this.currentVenueDetail.latitude}} , {{this.currentVenueDetail.longitude}})&nbsp;&nbsp;&nbsp;</span>
                    <span class="info description el-icon-bicycle">/Distance (km):</span>
                    <span class="info description" style="color: #ff9900;">{{this.currentVenueDetail.distance || 'Not Available'}}</span>
                </div>
                <div style="display: flex">
                    <div class="info description star-div">
                        <el-tag type="success" size="mini">Star Rate :</el-tag>
                    </div>
                    <div class="star-div">
                        <el-rate
                            :value="this.currentVenueDetail.meanStarRating || 3"
                            disabled
                            text-color="#909399">
                        </el-rate>
                    </div>
                    <div class="info description cost-div">
                        <el-tag type="success" size="mini">Cost Rate :</el-tag>
                        <span style="color: #ff9900;">{{this.currentVenueDetail.modeCostRating || 'Free'}}</span>
                    </div>
                </div>
                <div style="padding-top: 10px; padding-bottom: 5px" class="info description">
                    <el-tag type="info" size="mini">Owner</el-tag>
                    <span>&nbsp;{{this.currentVenueDetail.admin.username}}</span>
                </div>
                <div style="padding-bottom: 10px" class="info description">
                    <el-tag type="info" size="mini">Create Date</el-tag>
                    <span>&nbsp;{{this.currentVenueDetail.dateAdded}}</span>
                </div>
                <hr>
                <div style="padding-bottom: 10px; word-wrap:break-word;" class="info description">
                    <h3>About this venue</h3>
                    <span>{{this.currentVenueDetail.shortDescription}}</span>
                    <br>
                    <br>
                    <span>{{this.currentVenueDetail.longDescription}}</span>
                </div>

                <div id="reviewArea" v-show="login">
                    <hr>
                    <div class="info description">
                        <h3>Your Review is?</h3>
                    </div>
                    <div class="div-padding" style="display: flex; align-items: center">
                        <el-tag type="info" size="medium">Star Rate :</el-tag>
                        <span>&nbsp;</span>
                        <el-rate
                            v-model="starRating">
                        </el-rate>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <el-tag type="info" size="medium">Cost Rate :</el-tag>
                        <span>&nbsp;</span>
                        <el-select size="mini" v-model="costRating" placeholder="Cost Rate" clearable filterable>
                            <el-option
                                v-for="item in maxCostOptions"
                                :key="item.maxCostKey"
                                :label="item.maxCostName"
                                :value="item.maxCostKey">
                            </el-option>
                        </el-select>
                        <!--<el-input-number size="mini" :min="0" :max="4" :step="1" step-strictly v-model="costRating"></el-input-number>-->
                    </div>
                    <div class="div-padding">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 5}"
                            placeholder="Your point of view..."
                            v-model="reviewBody">
                        </el-input>
                    </div>
                    <div class="div-padding">
                        <el-button size="small" type="primary"  v-on:click="onSubmitSave()">Save</el-button>
                    </div>
                </div>
                <hr>
                <div id="venue_reviews" style="display: grid">
                    <div class="info description">
                        <h3>Reviews</h3>
                    </div>
                    <div v-for="review in this.currentVenueReviews" v-bind:key='review'>
                        <div class="info description" style="padding-bottom: 10px; display: flex">
                            <div style="border-radius: 50%; width: 40px; height: 40px; display: flex">
                                <img :src="review.userPhotoSrc" style="border-radius: 50%; width: 40px; height: 40px; display: flex"/>
                            </div>
                            <div>
                                <div style="padding-bottom: 5px; cursor: pointer">
                                    <tr>
                                        <td>
                                            <el-popover
                                                placement="top-start"
                                                width="300"
                                                trigger="click">

                                                <el-card :body-style="{ padding: '0px' }">
                                                    <img :src="review.userPhotoSrc" class="reviewUserPhoto"/>
                                                    <div style="padding: 14px;">
                                                        <el-tag type="info" size="mini">User Name:&nbsp;&nbsp;&nbsp;</el-tag>
                                                        <span>{{review.reviewAuthor.username}}</span>
                                                        <hr>
                                                        <el-tag type="info" size="mini">Given Name:&nbsp;</el-tag>
                                                        <span>{{review.reviewAuthor.givenName}}</span>
                                                        <hr>
                                                        <el-tag type="info" size="mini">Family Name: </el-tag>
                                                        <span>{{review.reviewAuthor.familyName}}</span>
                                                    </div>
                                                </el-card>
                                                <span slot="reference">&nbsp;{{review.reviewAuthor.username}}</span>
                                            </el-popover>
                                        </td>
                                    </tr>
                                </div>
                                <div>
                                    <tr>
                                        <td>
                                            <div class="info description">
                                                <span>&nbsp;{{review.timePosted}}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </div>
                            </div>
                        </div>
                        <div class="info description" style="padding-bottom: 10px">
                            <span>{{review.reviewBody}}</span>
                        </div>
                        <div style="display: flex">
                            <div class="info description star-div">Star Rate :</div>
                            <div class="star-div">
                                <el-rate
                                    :value="review.starRating"
                                    disabled
                                    text-color="#909399">
                                </el-rate>
                            </div>
                            <div class="info description cost-div">
                                <span>Cost Rate:</span>
                                <span style="color: #ff9900;">{{review.costRating || 'Free'}}</span>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'

    export default {
        name: "VenueDetail",
        data (){
            return{
                error: "",
                errorFlg: false,
                bigPhotoVisible: false,
                imageSrc: "",
                photoDescription: "",
                starRating: null,
                costRating: "",
                reviewBody: "",
                maxCostOptions: [{
                    maxCostKey: 0,
                    maxCostName: 'Free'
                },{
                    maxCostKey: 1,
                    maxCostName: '$'
                },{
                    maxCostKey: 2,
                    maxCostName: '$$'
                },{
                    maxCostKey: 3,
                    maxCostName: '$$$'
                },{
                    maxCostKey: 4,
                    maxCostName: '$$$$'
                }],
            }
        },
        mounted (){

        },
        methods:{
            ...mapActions(['postVenueReview']),
            ...mapActions(['getVenueDetail']),

            onRouterLinkClick: function () {
                this.$parent.showVenues = true;
                this.reviewBody = "";
                this.starRating = null;
                this.costRating = "";
            },
            onSubmitSave: function () {
                let header = {headers: {'Content-Type':'application/json', 'X-Authorization':this.currentUser.UserToken}}

                let params = {
                    header: header,
                    venueId: this.currentVenueDetail.venueId,
                    review:{
                        "reviewBody": this.reviewBody,
                        "starRating": this.starRating,
                        "costRating": this.costRating
                    }
                }
                this.postVenueReview(params).then(data =>{
                    alert("Review save successfully.")

                    //Refresh screen
                    this.reviewBody = "";
                    this.starRating = null;
                    this.costRating = "";
                    this.getVenueDetail({id: this.currentVenueDetail.venueId, meanStarRating: this.currentVenueDetail.meanStarRating,
                        modeCostRating: this.currentVenueDetail.modeCostRating, distance: this.currentVenueDetail.distance});
                }).catch(error =>{
                    alert(error.response.status + " : " + error.response.statusText)
                })
            }
        },
        computed:{
            ...mapState(["pageLoading"]),
            ...mapState(["currentVenueDetail"]),
            ...mapState(["currentVenueReviews"]),
            ...mapState(["login"]),
            ...mapState(["currentUser"]),
        }
    }
</script>

<style scoped>
    .div-padding{
        padding-bottom: 10px;
    }
    .listing-container {
        width: 60%;
        margin: 0 auto;
        padding: 0 12px;
    }
    .info {
        font-family: 'Open Sans',sans-serif;
        color: #484848;
    }
    .info.title{
        font-size: 32px;
        font-weight: 700;
    }
    .info.description{
        font-size: 14px;
    }
    .star-div {
        display: block;
        float: left;
    }
    .cost-div {
        display: block;
        float: left;
    }
    .venue-detail-container{
        display: grid;
        z-index: 1;
    }
    .carousel-div{
        width: 100%;
        text-align: center;
        vertical-align: middle;
        margin: 0 auto;
        padding-top: 57px;
    }
    .full-photo-div {
        /*background-repeat: no-repeat;*/
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-position-x: 50%;
        background-position-y: 50%;
        background-color: #f5f5f5;
        height: 100%;
        width: 100%;
        cursor: pointer;
        position: relative;
        margin: 0 auto;
        border-radius: 4px;
    }
    .full-photo {
        width: 100%;
        height: 100%;
        /*background-size: cover;*/
        background-position: 100%;
        border-radius: 4px
    }
    .reviewUserPhoto{
        width: 298px;
        height: 300px;
        border-radius: 5px;
        border: 1px solid #EBEBEB !important;
    }
    .back-button {
        position: fixed;
        z-index: 99;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        width: 20px;
        height: 40px;
        margin: 0;
        padding: 0;
    }
    hr {
        border: 0;
        border-top: 1px solid #dce0e0;
    }
</style>
