<template>
    <div id="toolBar">
        <div>
            <form>
                <div class="searchBar">
                    <select v-model="selected" class="searchArea selectList">
                        <option value="">All Cities</option>
                        <option value="Christchurch">Christchurch</option>
                        <option value="New York">New York</option>
                        <option value="London">London</option>
                        <option value="Shanghai">Shanghai</option>
                    </select>
                </div>
                <div class="searchBar">
                    <input type="search" v-model="q" placeholder=" Search Content" class="searchArea searchBox">
                    <input type="submit" v-on:click="onSubmit" style="visibility: hidden">
                </div>
            </form>
        </div>
        <div id="loginBar">
            <ul v-if="login">
                <li>
                    <a href="/login">My Venue</a>
                </li>
                <li>
                    <a href="/login">Personal</a>
                </li>
            </ul>
            <ul v-else>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/login">Register</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Search",
        data (){
            return{
                selected: "",
                q:""
            }
        },
        methods:{
            onSubmit: function () {
                let params = {}
                if (this.selected){
                    params.city = this.selected
                }
                if (this.q){
                    params.q = this.q
                }
                params.pageSize = this.pageSize
                this.$parent.getVenues(params);
            }
        },
        computed:{
            ...mapState(["login"]),
            ...mapState(["pageSize"])
        }
    }
</script>

<style scoped>
    .searchArea {
        color: #484848;
        background-color: #ffffff !important;
        -webkit-transition: box-shadow 200ms ease-in !important;
        -moz-transition: box-shadow 200ms ease-in !important;
        transition: box-shadow 200ms ease-in !important;
        border: 1px solid #EBEBEB !important;
        border-radius: 4px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        height: 40px !important;
        padding: 0px !important;
        text-overflow: ellipsis !important;
        font-weight: 500 !important;
        font-size: 16px !important;
        font-family: 'Open Sans';
    }
    .selectList {
        width: 150px !important;
        margin: 0 10px 10px 33px !important;
    }
    .searchBox {
        width: 400px !important;
    }
    #toolBar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        box-shadow:0px 15px 10px -15px #ccc;
        margin: 0 0 7px 0 !important;
    }
    .searchBar {
        display: flex;
        float: left;
    }
    #loginBar{
        display: flex;
        float:right;
        font-family: 'Open Sans';
        font-weight: 500 !important;
        font-size: 14px !important;
        margin: 0 0 10px 0 !important;
    }
    #loginBar ul {
        display: flex;
        align-items: center;
        padding: 0 10pt 0 0;
        margin: 0;
    }
    #loginBar li {
        list-style: none;
        padding: 0 24px 0 0;
    }
    #loginBar a {
        color: #484848;
        letter-spacing: .5px;
        cursor: pointer;
        align-items: center;
        text-decoration: none;
    }
</style>
