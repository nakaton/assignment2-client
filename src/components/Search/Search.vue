<template>
    <div id="toolBar">
        <div id="searchBar">
            <div>
                <div>
                    <select class="searchArea selectList">
                        <option value="Christchurch">Christchurch</option>
                        <option value="New York">New York</option>
                        <option value="London">London</option>
                        <option value="Shanghai">Shanghai</option>
                    </select>
                </div>
            </div>
            <div>
                <form>
                    <input type="search" placeholder=" Search Content" class="searchArea searchBox">
                    <input type="submit" v-on:click="onSubmit" style="visibility: hidden">
                </form>
            </div>
        </div>
        <div id="loginBar">
            <ul>
                <li v-show="login">
                    <a href="/login">Login</a>
                </li>
                <li v-show="logiout">
                    <a href="/login">Register</a>
                </li>
                <li>
                    <a href="/login">My Venue</a>
                </li>
                <li>
                    <a href="/login">Personal</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search",
        methods:{
            onSubmit: function () {
                this.$parent.getVenues();
            }
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
    #searchBar {
        display: flex;
        float: left;
        color:red;
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
