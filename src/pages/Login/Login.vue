<template>
    <div>
        <div v-if="this.isRegister" id="register" class="login-container">
            <form>
                <div class="div-padding">
                    <el-input placeholder="Given Name" v-model="givenName" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Family Name" v-model="familyName" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="User Name" v-model="username" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Email" v-model="email" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Password" v-model="password" show-password></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Password Confirm" v-model="passwordConfirm" show-password></el-input>
                </div>
                <div>
                    <el-button type="primary" v-on:click="onSubmitUserRegister()">Sign Up</el-button>
                </div>
            </form>
            <div class="change-form">
                <span>Already have an account?&nbsp;</span>
                <router-link :to="{ name : 'register'}">
                    <a v-on:click="isRegister = false">Log in</a>
                </router-link>
                <span>&nbsp;Or&nbsp;</span>
                <router-link :to="{ name : 'venues'}">
                    <a>Stay as a visitor</a>
                </router-link>
            </div>
        </div>
        <div v-else id="login" class="login-container">
            <form>
                <div class="div-padding">
                    <el-input placeholder="User Name" v-model="username" clearable maxlength="64"></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Email" v-model="email" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Password" v-model="password" show-password></el-input>
                </div>
                <div>
                    <el-button type="primary"  v-on:click="onSubmitUserLogin()">Log in</el-button>
                </div>
            </form>
            <div class="change-form">
                <span>Don’t have an account?&nbsp;</span>
                <router-link :to="{ name : 'login'}">
                    <a v-on:click="isRegister = true">Sign up</a>
                </router-link>
                <span>&nbsp;Or&nbsp;</span>
                <router-link :to="{ name : 'venues'}">
                    <a>Stay as a visitor</a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'

    export default {
        name: "Login",
        data (){
            return{
                error: "",
                errorFlg: false,
                givenName: "",
                familyName: "",
                username: "superman",
                email: "",
                password: "test",
                passwordConfirm: "",
                isRegister: false
            }
        },
        methods:{
            ...mapActions(['userLogin']),
            ...mapActions(['userRegister']),

            onSubmitUserRegister: function () {
                if(this.password == this.passwordConfirm){
                    this.userRegister({
                        username: this.username,
                        email: this.email,
                        givenName: this.givenName,
                        familyName: this.familyName,
                        password: this.password
                    }).then(data => {
                        // resolve(response.data)
                        //After successfully register, auto login
                        this.onSubmitUserLogin()
                    }).catch(error => {
                        alert(error.response.status + " : " + error.response.statusText)
                    });
                } else {
                    alert("Please input same password between 'Password' and 'Password Confirm'.")
                }
            },
            onSubmitUserLogin: function () {
                this.userLogin({
                    username: this.username,
                    email: this.email,
                    password: this.password
                }).then(data => {
                    // alert("success")
                    this.$router.push({path: '/venues'})
                }).catch(error => {
                    alert(error.response.status + " : " + error.response.statusText)
                });
            }
        },
        computed:{
            ...mapState(["showLogin"]),
        }
    }
</script>

<style scoped>
    .login-container {
        display: block;
        height: 50%;
        width: 30%;
        margin: 0 auto;
        padding: 0 12px;
    }
    .div-padding{
        padding-bottom: 10px;
    }
    .change-form {
        padding-top: 20px;
        text-align: center;
    }
    #register form{
        padding-top: 80px;
    }
    #login form{
        padding-top: 80px;
    }
    button{
        width: 100%;
    }
</style>
