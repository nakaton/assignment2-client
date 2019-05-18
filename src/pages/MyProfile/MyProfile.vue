<template>
    <div class="listing-container">
        <Search v-if="isSearchShow"/>
        <div style="padding-top: 55px;">
            <h3>My Profile</h3>
        </div>
        <hr>
        <div>
            <form>
                <div class="div-padding">
                    <el-input placeholder="User Name" v-model="userName" :disabled="true" clearable maxlength="64"></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Email Address" v-model="email" :disabled="true" clearable></el-input>
                </div>
                <div class="div-padding">
                    <i class="el-icon-edit"></i>
                    <el-input placeholder="Given Name" v-model="givenName" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Family Name" v-model="familyName" clearable></el-input>
                </div>
                <div class="info description" style="padding-bottom: 5px">

                    <span class="el-icon-info">
                        Input below tow fields, only when you want to change password!
                    </span>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Current Password" v-model="currentPassword" clearable show-password></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="New Password" v-model="newPassword" clearable show-password></el-input>
                </div>
                <div class="div-padding" v-show="isPhotoUploadShow">
                    <el-upload
                        :action="userPhotoUploadUrl"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture-card"
                        accept="form-data"
                        :http-request="photoUpload">
                        <el-button size="small" type="primary">Upload Photo</el-button>
                        <div slot="tip" class="el-upload__tip">Please upload jpg/png only, size not over 20MB</div>
                    </el-upload>
                </div>
                <div>
                    <el-button size="small" type="primary"  v-on:click="onSubmitUpdate()">Update</el-button>
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
                isSearchShow: true,
                isPhotoUploadShow: true,
                userPhotoUploadUrl: "",
                userName: "",
                givenName: "",
                familyName: "",
                email: "",
                currentPassword: "",
                newPassword: "",
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

                let file = {name: "user photo", url: this.currentUser.UserPhoto}
                if (this.currentUser.UserPhoto != 'src/pages/Venues/images/default.png') {
                    this.fileList.push(file);
                }
            };

        },
        computed:{
            ...mapState(["currentUser"])
        },
        methods: {
            ...mapActions(['userLogin']),
            ...mapActions(['getVenues']),
            ...mapActions(['patchUserDetail']),
            ...mapActions(['uploadUserPhoto']),
            ...mapActions(['deleteUserPhoto']),

            forceRefresh: function () {
                this.isSearchShow = false
                this.$nextTick(()=>{
                    this.isSearchShow = true
                });
            },

            handleRemove(file, fileList) {
                alert("remove")
                let header = {headers: {'X-Authorization':this.currentUser.UserToken}}

                let params = {
                    header: header,
                    userId: this.currentUser.UserId
                };

                this.deleteUserPhoto(params).then(data => {
                    localStorage.setItem("currentUser_photo",'src/pages/Venues/images/default.png')
                    this.fileList = []
                    this.forceRefresh()
                }).catch(error =>{
                    alert(error.response.status + " : " + error.response.statusText)
                })

            },
            photoUpload: function (options) {
                let file = options.file
                let fileName = file.name
                let fileType = file.type

                let header = {headers: {'Content-Type':fileType, 'X-Authorization':this.currentUser.UserToken}}

                let params = {
                    header: header,
                    userId: this.currentUser.UserId,
                    file: file
                };

                this.uploadUserPhoto(params).then(data =>{
                    this.fileList = []
                    let file = {name: "user photo", url: this.currentUser.UserPhoto}
                    this.fileList.push(file)

                    this.forceRefresh()
                }).catch(error => {
                    alert(error.response.status + " : " + error.response.statusText)
                })
            },
            onSubmitUpdate: function () {
                let header = {headers: {'Content-Type':'application/json', 'X-Authorization':this.currentUser.UserToken}}

                let params = {
                    header: header,
                    userId: this.currentUser.UserId,
                    profile:{
                        "givenName": this.givenName,
                        "familyName": this.familyName,
                        "password": this.newPassword == "" ? undefined : this.newPassword
                    }
                };

                if (this.newPassword != "") {
                    if (this.currentPassword == "") {
                        alert("Please input Current Password!")
                    }else{
                        this.userLogin({
                            username: this.username,
                            email: this.email,
                            password: this.currentPassword
                        }).then(data => {
                            // alert("CurrentPassword Correct")

                            // Because Login successfully, token changed
                            let header = {headers: {'Content-Type':'application/json', 'X-Authorization':this.currentUser.UserToken}}
                            params.header = header
                            this.patchUserDetail(params).then(data => {
                                alert("Your Profile update successfully.")
                                localStorage.setItem("givenName",this.givenName);
                                localStorage.setItem("familyName",this.familyName);
                            }).catch(error => {
                                alert(error.response.status + " : " + error.response.statusText)
                            });
                        }).catch(error => {
                            alert("CurrentPassword incorrect!")
                        });
                    }
                }else{
                    this.patchUserDetail(params).then(data => {
                        alert("Your Profile update successfully.")
                        localStorage.setItem("givenName",this.givenName);
                        localStorage.setItem("familyName",this.familyName);
                    }).catch(error => {
                        alert(error.response.status + " : " + error.response.statusText)
                    });
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
    .info.description {
        font-size: 14px;
        line-height: 18px;
    }

</style>
