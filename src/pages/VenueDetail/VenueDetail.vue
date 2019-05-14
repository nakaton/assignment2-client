<template>
    <div v-loading="this.pageLoading" class="venueDetailContainer">
        <div class="carouselDiv">
            <el-carousel indicator-position="outside" height="350px">
                <el-carousel-item v-for="item in this.currentVenueDetail.photos" :key="item.photoFilename">
                    <div class="fullPhotoDiv" v-bind:style="{backgroundImage:'url(' + item.src + ')'}"
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
                <img :src='imageSrc' class="fullPhoto"/>
            </el-dialog>
        </div>
        <div class="backButton">
            <router-link :to="{ name : 'venues'}">
                <div>
                    <a v-on:click="onRouterLinkClick">
                        <el-button type="info" icon="el-icon-back" plain class="backButton"></el-button>
                    </a>
                </div>
            </router-link>
        </div>

        <div v-show="!this.pageLoading" class="listing-container">
            <div class="info">
                <div class="info title">
                    <span>{{this.currentVenueDetail.venueName}} | {{this.currentVenueDetail.city}}</span>
                </div>
                <div>
                    <el-tag type="info" size="mini">{{this.currentVenueDetail.category.categoryName}}</el-tag>
                    <span class="info description">({{this.currentVenueDetail.category.categoryDescription}})</span>
                </div>
                <div style="padding-bottom: 10px">
                    <span class="info description">{{this.currentVenueDetail.address}}</span>
                    <span class="info description">&nbsp;&nbsp;({{this.currentVenueDetail.latitude}} , {{this.currentVenueDetail.longitude}})</span>
                </div>
                <hr>
                <div style="padding-bottom: 10px" class="info description">
                    <h3>About this venue</h3>
                    <span>{{this.currentVenueDetail.shortDescription}}</span>
                    <br>
                    <br>
                    <span>{{this.currentVenueDetail.longDescription}}</span>
                </div>
                <hr>
                <div style="padding-top: 10px" class="info description">
                    <span>Owner: {{this.currentVenueDetail.admin.username}}</span>
                </div>
                <div style="padding-bottom: 10px" class="info description">
                    <span>Create By: {{this.currentVenueDetail.dateAdded}}</span>
                </div>
                <div>
                    <div class="info description star-div">Star Rate:</div>
                    <div class="star-div">
                        <el-rate
                            v-model="this.currentVenueDetail.meanStarRating"
                            disabled
                            text-color="#909399">
                        </el-rate>
                    </div>
                    <div class="info description cost-div">
                        Cost Rate:
                        <span style="color: #ff9900;">{{this.currentVenueDetail.modeCostRating || 0.0}} $</span>
                    </div>
                </div>
                <!--<br/>-->
                <!--<span>meanStarRating: {{this.currentVenueDetail.meanStarRating}}</span>-->
                <!--<br/>-->
                <!--<span>modeCostRating: {{this.currentVenueDetail.modeCostRating}}</span>-->
                <!--<br/>-->
                <!--<span>admin.userId: {{this.currentVenueDetail.admin.userId}}</span>-->
                <!--<br/>-->
                <!--<span>admin.username: {{this.currentVenueDetail.admin.username}}</span>-->
                <!--<br/>-->
                <!--<span>categoryName: {{this.currentVenueDetail.category.categoryName}}</span>-->
                <!--<br/>-->
                <!--<span>categoryDescription: {{this.currentVenueDetail.category.categoryDescription}}</span>-->
                <!--<br/>-->
                <!--<span>city: {{this.currentVenueDetail.city}}</span>-->
                <!--<br/>-->
                <!--<span>shortDescription: {{this.currentVenueDetail.shortDescription}}</span>-->
                <!--<br/>-->
                <!--<span>longDescription: {{this.currentVenueDetail.longDescription}}</span>-->
                <!--<br/>-->
                <!--<span>dateAdded: {{this.currentVenueDetail.dateAdded}}</span>-->
                <!--<br/>-->
                <!--<span>address: {{this.currentVenueDetail.address}}</span>-->
                <!--<br/>-->
                <!--<span>latitude: {{this.currentVenueDetail.latitude}}</span>-->
                <!--<br/>-->
                <!--<span>longitude: {{this.currentVenueDetail.longitude}}</span>-->
                <!--<br/>-->
                <!--<div v-for="item in this.currentVenueDetail.photos">-->
                    <!--<img :src='item.src' class="thumbnail"/>-->
                    <!--<br/>-->
                    <!--<span>photoFilename: {{item.photoFilename}}</span>-->
                    <!--<br/>-->
                    <!--<span>photoDescription: {{item.photoDescription}}</span>-->
                    <!--<br/>-->
                    <!--<span>isPrimary: {{item.isPrimary}}</span>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "VenueDetail",
        data (){
            return{
                error: "",
                errorFlg: false,
                bigPhotoVisible: false,
                imageSrc: "",
                photoDescription: ""
            }
        },
        mounted (){

        },
        methods:{
            onRouterLinkClick: function () {
                this.$parent.showVenues = true;
            }
        },
        computed:{
            ...mapState(["pageLoading"]),
            ...mapState(["currentVenueDetail"])
        }
    }
</script>

<style scoped>
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
        display: inline-block;
        float: left;
    }
    .cost-div {
        /*display: inline-block;*/
        float: left;
    }
    .venueDetailContainer{
        display: grid;
        z-index: 1;
    }
    .carouselDiv{
        width: 100%;
        text-align: center;
        vertical-align: middle;
        margin: 0 auto;
        padding-top: 57px;
    }
    .fullPhotoDiv {
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
    .fullPhoto {
        width: 100%;
        height: 100%;
        /*background-size: cover;*/
        background-position: 100%;
        border-radius: 4px
    }
    .backButton {
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
