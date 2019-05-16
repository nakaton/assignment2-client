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
                    <a v-on:click="onMoveToVenue">Stay as a visitor</a>
                </router-link>
            </div>
        </div>
        <div v-else id="login" class="login-container">
            <form>
                <div class="div-padding">
                    <el-input placeholder="User Name" v-model="username" clearable></el-input>
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
                    <a v-on:click="onMoveToVenue">Stay as a visitor</a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'
    import {
        SHOW_LOGIN
    } from '../../store/mutations-types'

    export default {
        name: "Login",
        data (){
            return{
                error: "",
                errorFlg: false,
                givenName: "",
                familyName: "",
                username: "",
                email: "",
                password: "",
                passwordConfirm: "",
                isRegister: false
            }
        },
        methods:{
            ...mapActions(['userLogin']),
            ...mapActions(['userRegister']),

            onSubmitUserRegister: function () {
                this.userRegister({
                    username: this.username,
                    email: this.email,
                    givenName: this.givenName,
                    familyName: this.familyName,
                    password: this.password
                })
            },
            onSubmitUserLogin: async function () {
                alert(1)
                try{
                    await this.userLogin({
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                    alert("success")
                    this.$router.push({path: '/venues'})
                }catch (e) {
                    alert("error")
                }
            },
            onMoveToVenue: function () {
                this.$store.commit(SHOW_LOGIN, {showLogin: false});
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
