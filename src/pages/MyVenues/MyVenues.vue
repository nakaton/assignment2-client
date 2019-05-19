<template>
    <div class="listing-container">
        <Search/>
        <div style="padding-top: 55px;">
            <h3>My Venues</h3>
            <div style="display:flex; align-items:center; padding-bottom: 5px">
                <a href="#venueDetail">
                    <el-button size="small" type="primary"
                               v-on:click="addNewVenue">
                        Add New Venue
                    </el-button>
                </a>
            </div>
        </div>
        <hr>
        <div  v-if="isListShow">
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
                    <div style="display:flex; align-items:center">
                        <a href="#venueDetail">
                            <el-button size="small" type="primary"
                                       v-on:click="editVenue(item)">
                                Edit
                            </el-button>
                        </a>
                    </div>
                </div>
                <hr>
            </div>
        </div>
        <div v-if="isDetailShow" id="venueDetail">
            <h3>Venue Detail</h3>
            <form>
                <div class="div-padding" style="display: flex">
                    <div style="display: flex; padding-right: 10px">
                        <el-input placeholder="Venue Name" v-model="venueName" clearable maxlength="64"></el-input>
                    </div>
                    <div style="display: flex; padding-right: 10px">
                        <el-select v-model="city" placeholder="City">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="display: flex; padding-right: 10px">
                        <el-select v-model="category" placeholder="Category">
                            <el-option
                                v-for="item in categories"
                                :key="item.categoryId"
                                :label="item.categoryName"
                                :value="item.categoryId">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="div-padding">
                    <el-input
                        type="textarea"
                        autosize
                        placeholder="Short Description"
                        v-model="shortDescription">
                    </el-input>
                </div>
                <div class="div-padding">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 5}"
                        placeholder="Long Description"
                        v-model="longDescription">
                    </el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Address" v-model="address" clearable></el-input>
                </div>
                <div class="div-padding" style="display: flex">
                    <el-input style="display: flex; padding-right: 10px" placeholder="Latitude" v-model="latitude" clearable></el-input>
                    <el-input placeholder="Longitude" v-model="longitude" clearable></el-input>
                </div>

                <div class="div-padding" v-show="isPhotoUploadShow">
                    <el-upload
                        :action="venuePhotoUploadUrl"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture-card"
                        :http-request="venuePhotoUpload">
                        <el-button size="small" type="primary">Upload Photo</el-button>
                        <div slot="tip" class="el-upload__tip">Please upload jpg/png only, size not over 20MB</div>
                    </el-upload>
                </div>
                <div>
                    <el-button size="small" type="primary"  v-on:click="onSubmitSave()">Save</el-button>
                </div>

                <div>
                    <el-dialog
                        :visible.sync="isPhotoSettingShow"
                        title="Make Primary"
                        width="50%">

                        <div class="div-padding">
                            <span class="el-icon-info">Set photo as the primary one for this venue?&nbsp;&nbsp;</span>
                        </div>
                        <div>
                            <el-button size="small" type="primary"  v-on:click="onSubmitSetPrimary()">Confirm</el-button>
                        </div>
                    </el-dialog>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Search from '../../components/Search/Search.vue'
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'
    import {
        LOGIN
    } from '../../store/mutations-types'

    export default {
        name: "MyVenues",
        data (){
            return{
                error: "",
                errorFlg: false,
                isListShow: true,
                isDetailShow: false,
                isPhotoUploadShow: false,
                isPhotoSettingShow: false,
                venuePhotoUploadUrl: "",
                options: [{
                    value: 'Christchurch',
                    label: 'Christchurch'
                }, {
                    value: 'New York',
                    label: 'New York'
                }, {
                    value: 'London',
                    label: 'London'
                }, {
                    value: 'Shanghai',
                    label: 'Shanghai'
                }],
                venueId: "",
                venueName: "",
                category: "",
                shortDescription: "",
                longDescription: "",
                city: "",
                address: "",
                latitude: "",
                longitude: "",
                photoDescription: "",
                makePrimary: false,
                photoFilename: "",
                fileList:[]
            }
        },
        mounted (){
            if(localStorage.getItem("isLogin") == 'true'){
                // alert("true")
                this.$store.commit(LOGIN, {login: true});

                let params = {}
                params.adminId = this.currentUser.UserId
                params.pageSize = 100 //No need to change page, so set as 100
                this.getVenues(params);

                this.getCategories({});
            };

        },
        computed:{
            ...mapState(["venues"]),
            ...mapState(["pageSize"]),
            ...mapState(["currentPageVenues"]),
            ...mapState(["pageLoading"]),
            ...mapState(["categories"]),
            ...mapState(["currentUser"])
        },
        methods: {
            ...mapActions(['getVenues']),
            ...mapActions(['getVenueDetail']),
            ...mapActions(['getCategories']),
            ...mapActions(['patchVenueDetail']),
            ...mapActions(['addVenue']),
            ...mapActions(['uploadVenuePhoto']),
            ...mapActions(['deleteVenuePhoto']),
            ...mapActions(['setVenuesPrimaryPhoto']),

            forceRefreshList: function () {
                this.isListShow = false
                this.$nextTick(()=>{
                    this.isListShow = true
                });
            },
            forceRefreshDetail: function () {
                this.isDetailShow = false
                this.$nextTick(()=>{
                    this.isDetailShow = true
                });
            },
            handlePreview(file) {
                console.log(file);
                this.isPhotoSettingShow = true
                this.photoFilename = file.name
            },
            handleRemove(file, fileList) {
                let header = {headers: {'X-Authorization':this.currentUser.UserToken}}
                let params = {
                    header: header,
                    venueId: this.venueId,
                    photoFilename: file.name
                };

                this.deleteVenuePhoto(params).then(data => {
                    let params = {}
                    params.adminId = this.currentUser.UserId
                    params.pageSize = 100 //No need to change page, so set as 100
                    this.getVenues(params).then(data=>{
                        this.forceRefreshList()
                    })
                }).catch(error =>{
                    alert(error.response.status + " : " + error.response.statusText)
                })

            },
            venuePhotoUpload: function (options) {
                // alert(2)
                // alert(this.photoDescription)
                let file = options.file
                let fileName = file.name

                let formData = new window.FormData()
                formData.append('photo', file)
                formData.append('description', this.photoDescription)
                formData.append('makePrimary', this.makePrimary)

                let header = {headers: {'Content-Type':'multipart/form-data', 'X-Authorization':this.currentUser.UserToken}}

                let params = {
                    header: header,
                    venueId: this.venueId,
                    formData: formData
                }

                this.uploadVenuePhoto(params).then(data =>{
                    let params = {}
                    params.adminId = this.currentUser.UserId
                    params.pageSize = 100 //No need to change page, so set as 100
                    this.getVenues(params).then(data=>{
                        for(let i = 0; i < this.currentPageVenues.length; i++){
                            if(this.currentPageVenues[i].venueId == this.venueId){
                                this.fileList = this.currentPageVenues[i].photos
                            }
                        }
                        this.forceRefreshList()
                        // this.forceRefreshDetail()
                    })
                }).catch(error => {
                    alert(error.response.status + " : " + error.response.statusText)
                })
            },
            addNewVenue: function () {
                this.isDetailShow = true
                this.isPhotoUploadShow = false

                this.venueName = ""
                this.category = ""
                this.shortDescription = ""
                this.longDescription = ""
                this.city = ""
                this.address = ""
                this.latitude = ""
                this.longitude = ""
                this.photoDescription = ""
            },
            editVenue: function (item) {
                this.isDetailShow = true
                this.isPhotoUploadShow = true

                this.venueId = item.venueId
                this.venueName = item.venueName
                this.category = item.categoryId
                this.shortDescription = item.shortDescription
                this.longDescription = item.longDescription
                this.city = item.city
                this.address = item.address
                this.latitude = item.latitude
                this.longitude = item.longitude
                this.fileList = item.photos
                this.photoDescription = ""
            },
            onSubmitSave: function () {
                let header = {headers: {'X-Authorization':this.currentUser.UserToken}}

                let params = {
                    header: header,
                    "venueId": this.venueId,
                    "venueName": this.venueName,
                    "categoryId": this.category,
                    "city": this.city,
                    "shortDescription": this.shortDescription,
                    "longDescription": this.longDescription,
                    "address": this.address,
                    "latitude": parseFloat(this.latitude),
                    "longitude": parseFloat(this.longitude)
                }

                if (this.isPhotoUploadShow) {//Update Venue
                    this.patchVenueDetail(params).then(data => {
                        alert("Venue Info update successfully.")

                        //Set latest data into screen
                        let params = {}
                        params.adminId = this.currentUser.UserId
                        params.pageSize = 100 //No need to change page, so set as 100
                        this.getVenues(params);
                    }).catch(error => {
                        alert(error.response.status + " : " + error.response.statusText)
                    });

                }else{ //Add new Venue
                    this.addVenue(params).then(data =>{
                        alert("Venue add successfully.")

                        this.isDetailShow = false
                        //Set latest data into screen
                        let params = {}
                        params.adminId = this.currentUser.UserId
                        params.pageSize = 100 //No need to change page, so set as 100
                        this.getVenues(params);
                    }).catch(error =>{
                        alert(error.response.status + " : " + error.response.statusText)
                    })
                }
            },
            onSubmitSetPrimary: function () {
                this.isPhotoSettingShow = false

                let header = {headers: {'X-Authorization':this.currentUser.UserToken}}
                let params = {
                    header: header,
                    venueId: this.venueId,
                    photoFilename: this.photoFilename
                };
                this.setVenuesPrimaryPhoto(params).then(data =>{
                    let params = {}
                    params.adminId = this.currentUser.UserId
                    params.pageSize = 100 //No need to change page, so set as 100
                    this.getVenues(params).then(data=>{
                        this.photoFilename = ""
                        this.forceRefreshList()
                    })
                }).catch(error =>{
                    alert(error.response.status + " : " + error.response.statusText)
                })
            }
        },
        components:{
            Search

        }
    }
</script>

<style scoped>
    .div-padding{
        padding-bottom: 10px;
    }
    .listing-container{
        width:60%;
        margin: 0 auto;
    }
    .listing-div{
        display: grid;
        border: 1px #EBEBEB;
        grid-template-columns: 25% 60% 15%;
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
