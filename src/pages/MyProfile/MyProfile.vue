<template>
    <div class="listing-container">
        <Search/>
        <div style="padding-top: 55px;">
            <h3>My Profile</h3>
        </div>
        <hr>
        <div>
            <form>
                <div class="div-padding">
                    <el-input placeholder="User Name" v-model="userName" clearable maxlength="64"></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Given Name" v-model="givenName" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Family Name" v-model="familyName" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Email Address" v-model="email" clearable></el-input>
                </div>
                <div class="div-padding" v-show="isPhotoUploadShow">
                    <el-upload
                        :action="'http://localhost:4941/api/v1/users/' + this.currentUser.UserId + '/photos'"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture-card"
                        accept="form-data">
                        <el-button size="small" type="primary">Upload Photo</el-button>
                        <div slot="tip" class="el-upload__tip">Please upload jpg/png only, size not over 500kb</div>
                    </el-upload>
                </div>
                <div>
                    <el-button size="small" type="primary"  v-on:click="onSubmitSave()">Save</el-button>
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
        name: "Venues",
        data (){
            return{
                error: "",
                errorFlg: false,
                isPhotoUploadShow: false,
                userName: "",
                givenName: "",
                familyName: "",
                email: "",
                fileList:[]
            }
        },
        mounted (){
            if(localStorage.getItem("isLogin") == 'true'){
                this.userName = this.currentUser.UserName
                this.givenName = this.currentUser.GivenName
                this.familyName = this.currentUser.FamilyName
                this.email = this.currentUser.Email
                // alert("true")
                this.$store.commit(LOGIN, {login: true});
            };

        },
        computed:{
            ...mapState(["currentUser"])
        },
        methods: {
            ...mapActions(['getVenues']),

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
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

                        //Set latest data into screen
                        let params = {}
                        params.adminId = this.currentUser.UserId
                        params.pageSize = 100 //No need to change page, so set as 100
                        this.getVenues(params);
                    }).catch(error =>{
                        alert(error.response.status + " : " + error.response.statusText)
                    })
                }
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
    a{
        color: #484848;
        letter-spacing: .5px;
        cursor: pointer;
        align-items: center;
        text-decoration: none;
    }

</style>
