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
                    <el-input placeholder="User Name" v-model="userName" clearable></el-input>
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
                    <el-button type="primary">Sign Up</el-button>
                </div>
            </form>
            <div class="change-form">
                <span>Already have an account? Log in</span>
            </div>
        </div>
        <div v-else id="login" class="login-container">
            <form>
                <div class="div-padding">
                    <el-input placeholder="User Name" v-model="userName" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Email" v-model="email" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Password" v-model="password" show-password></el-input>
                </div>
                <div>
                    <el-button type="primary">Log in</el-button>
                </div>
            </form>
            <div class="change-form">
                <span>Don’t have an account? Sign up</span>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data (){
            return{
                error: "",
                errorFlg: false,
                givenName: "",
                familyName: "",
                userName: "",
                email: "",
                password: "",
                passwordConfirm: "",
                isRegister: true
            }
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
    button{
        width: 100%;
    }
</style>
