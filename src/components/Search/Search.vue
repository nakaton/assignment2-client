<template>
    <div>
        <div id="toolBar">
            <div>
                <form>
                    <div class="searchBar" style="padding-left: 33px">
                        <el-input placeholder=" Search Content" v-model="q" class="searchArea searchBox">
                            <el-button slot="append" icon="el-icon-search" v-on:click="onSubmit"></el-button>
                        </el-input>
                        <div class="searchBar" style="padding-left: 5px;">
                            <el-button :icon="iconControl" v-on:click="showFilterBar" class="searchArea up-down-button"></el-button>
                        </div>
                        <!--<el-button :icon="iconControl" v-on:click="showFilterBar"></el-button>-->
                        <!--<input type="search" v-model="q" placeholder=" Search Content" class="searchArea searchBox">-->
                        <!--<input type="submit" v-on:click="onSubmit" style="visibility: hidden">-->
                    </div>
                </form>
            </div>
            <div id="loginBar">
                <ul v-if="login">
                    <li>
                        <router-link :to="{ name : 'myVenues'}">
                            <a>My Venue</a>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name : 'myProfile'}">
                            <a>My Profile</a>
                        </router-link>
                    </li>
                    <li>
                        <a v-on:click="onClickLogout">Log Out</a>
                    </li>
                    <li>
                        <div  style="border-radius: 50%; width: 40px; height: 40px; ">
                            <img :src="currentUser.UserPhoto" style="border-radius: 50%; width: 40px; height: 40px; display: flex;border: 2px solid #EBEBEB"/>
                        </div>
                    </li>
                </ul>
                <ul v-else>
                    <li>
                        <router-link :to="{ name : 'login'}">
                            <a>Login</a>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div id="filterBar" v-if="isFilterBarShow">
            <div class="searchBar">
                <el-select v-model="selected" filterable class="searchArea selectCityList">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

                <el-select v-model="category" placeholder="Category" clearable filterable class="searchArea selectList">
                    <el-option
                        v-for="item in categories"
                        :key="item.categoryId"
                        :label="item.categoryName"
                        :value="item.categoryId">
                    </el-option>
                </el-select>
                <el-select v-model="minStarRating" placeholder="Min Star" clearable filterable class="searchArea selectList">
                    <el-option
                        v-for="item in minStarOptions"
                        :key="item.minStarKey"
                        :label="item.minStarName"
                        :value="item.minStarKey">
                    </el-option>
                </el-select>
                <el-select v-model="maxCostRating" placeholder="Max Cost" clearable filterable class="searchArea selectList">
                    <el-option
                        v-for="item in maxCostOptions"
                        :key="item.maxCostKey"
                        :label="item.maxCostName"
                        :value="item.maxCostKey">
                    </el-option>
                </el-select>
                <el-select v-model="sortBy" placeholder="Sort By" clearable filterable class="searchArea selectList">
                    <el-option
                        v-for="item in sortByOptions"
                        :key="item.sortByKey"
                        :label="item.sortByName"
                        :value="item.sortByKey">
                    </el-option>
                </el-select>
                <el-checkbox v-model="checked">Reverse Sort</el-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'
    import {
        CURRENT_USER,
        LOGIN,
        SEARCH_CONTENT,
        SELECTED_CITY,
        SELECTED_CATEGORY,
        SELECTED_SORT_BY,
        SELECTED_MIN_STAR,
        SELECTED_MAX_COST,
        IS_REVERSE_SORT
    } from '../../store/mutations-types'


    export default {
        name: "Search",
        data (){
            return{
                isFilterBarShow: false,
                iconControl: 'el-icon-arrow-down',
                q:"",
                options: [{
                    value: '',
                    label: 'All Cities'
                }, {
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
                selected: "",
                category: "",
                minStarRating: "",
                minStarOptions: [{
                    minStarKey: 1,
                    minStarName: 'Star 1'
                },{
                    minStarKey: 2,
                    minStarName: 'Star 2'
                },{
                    minStarKey: 3,
                    minStarName: 'Star 3'
                },{
                    minStarKey: 4,
                    minStarName: 'Star 4'
                },{
                    minStarKey: 5,
                    minStarName: 'Star 5'
                }],
                maxCostRating: "",
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
                sortBy: "",
                sortByOptions: [{
                    sortByKey: 'STAR_RATING',
                    sortByName: 'Star Rating'
                },{
                    sortByKey: 'COST_RATING',
                    sortByName: 'Cost Rating'
                },{
                    sortByKey: 'DISTANCE',
                    sortByName: 'Distance'
                }],
                checked: false,
            }
        },
        mounted (){
            this.q = this.searchContent
            this.selected = this.selectedCity
            this.category = this.selectedCategory
            this.minStarRating = this.selectedMinStar
            this.maxCostRating = this.selectedMaxCost
            this.sortBy = this.selectedSortBy
            this.checked = this.isReverseSort

            this.getCategories({});
        },
        methods:{
            ...mapActions(['userLogout']),
            ...mapActions(['getCategories']),

            showFilterBar: function () {
                this.isFilterBarShow = !this.isFilterBarShow
                if (this.isFilterBarShow) {
                    this.iconControl = 'el-icon-arrow-up'
                }else{
                    this.iconControl = 'el-icon-arrow-down'
                }
            },
            onSubmit: function () {
                let params = {}
                if (this.selected){
                    params.city = this.selected
                }
                if (this.q){
                    params.q = this.q
                }
                if (this.category){
                    params.categoryId = this.category
                }
                if (this.minStarRating){
                    params.minStarRating = this.minStarRating
                }
                if (this.maxCostRating){
                    params.maxCostRating = this.maxCostRating
                }
                if (this.sortBy){
                    params.sortBy = this.sortBy
                }
                if (this.checked){
                    params.reverseSort = this.checked
                }
                this.$store.commit(SEARCH_CONTENT, {searchContent: this.q});
                this.$store.commit(SELECTED_CITY, {selectedCity: this.selected});
                this.$store.commit(SELECTED_CATEGORY, {selectedCategory: this.category});
                this.$store.commit(SELECTED_MIN_STAR, {selectedMinStar: this.minStarRating});
                this.$store.commit(SELECTED_MAX_COST, {selectedMaxCost: this.maxCostRating});
                this.$store.commit(SELECTED_SORT_BY, {selectedSortBy: this.sortBy});
                this.$store.commit(IS_REVERSE_SORT, {isReverseSort: this.checked});
                params.pageSize = this.pageSize
                this.$parent.getVenues(params);
                this.$parent.showVenues = true;
                this.$parent.currentPageNum = 1;
                this.$router.push({path:'/venues'});
            },
            onClickLogout: function () {
                if(this.currentUser.UserToken != ""){
                    this.userLogout({headers: {'X-Authorization':this.currentUser.UserToken}}).then(data=>{
                        this.$router.push({path: '/venues'});
                    }).catch(error=>{
                        alert(error.response.status + " : " + error.response.statusText)
                    })
                }else{
                    alert("User already log out")
                    this.$store.commit(LOGIN, {login: false});
                }
            }
        },
        computed:{
            ...mapState(["login"]),
            ...mapState(["pageSize"]),
            ...mapState(["currentUser"]),
            ...mapState(["categories"]),
            ...mapState(["searchContent"]),
            ...mapState(["selectedCity"]),
            ...mapState(["selectedCategory"]),
            ...mapState(["selectedMinStar"]),
            ...mapState(["selectedMaxCost"]),
            ...mapState(["selectedSortBy"]),
            ...mapState(["isReverseSort"]),
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
        width: 110px !important;
        margin: 0 10px 10px 0 !important;
    }
    .selectCityList {
        width: 110px !important;
        margin: 0 10px 10px 33px !important;
    }
    .searchBox {
        width: 400px !important;
    }
    #toolBar{
        padding-top: 4px;
        padding-bottom: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        box-shadow:0px 15px 10px -15px #ccc;
        background-color: #ffffff !important;
        width: 100%;
        position: fixed;
        left: 0px !important;
        top: 0px !important;
        z-index: 99;
    }
    #filterBar{
        padding-top: 7px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-decoration: none;
        box-shadow:0px 15px 10px -15px #ccc;
        background-color: #ffffff !important;
        width: 100%;
        position: fixed;
        left: 0px !important;
        top: 57px !important;
        z-index: 99;
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
    .up-down-button {
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        width: 20px;
        height: 40px;
        margin: 0;
        padding: 0 10px 0 0;
    }
</style>
