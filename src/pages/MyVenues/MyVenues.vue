<template>
    <div class="listing-container">
        <Search/>
        <div style="padding-top: 55px;">
            <h3>My Venues</h3>
            <div style="display:flex; align-items:center; padding-bottom: 5px">
                <el-button size="small" type="primary">Add New Venue</el-button>
            </div>
        </div>
        <div style="border: 1px solid #EBEBEB">
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
                                    v-model="item.meanStarRating"
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
                        <el-button size="small" type="primary">Edit</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <h3>Venue Detail</h3>
            <form>
                <div class="div-padding" style="display: flex">
                    <div style="display: flex; padding-right: 10px">
                        <el-input placeholder="Venue Name" v-model="venuename" clearable maxlength="64"></el-input>
                    </div>
                    <div style="display: flex; padding-right: 10px">
                        <el-select v-model="value" placeholder="City">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="display: flex; padding-right: 10px">
                        <el-select v-model="value" placeholder="Category">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="div-padding">
                    <el-input
                        type="textarea"
                        autosize
                        placeholder="Short Description"
                        v-model="textarea1"
                        clearable>
                    </el-input>
                </div>
                <div class="div-padding">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 5}"
                        placeholder="Long Description"
                        v-model="textarea2"
                        clearable>
                    </el-input>
                </div>
                <div class="div-padding">
                    <el-input placeholder="Address" v-model="address" clearable></el-input>
                </div>
                <div class="div-padding" style="display: flex">
                    <el-input style="display: flex; padding-right: 10px" placeholder="Latitude" v-model="latitude" clearable></el-input>
                    <el-input placeholder="Longitude" v-model="longitude" clearable></el-input>
                </div>
                <div class="div-padding">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
    import Pagination from '../../components/Pagination/Pagination.vue'
    import VenueDetail from '../VenueDetail/VenueDetail.vue'
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
                venuename: "",
                category: "",
                shortDescription: "",
                longDescription: "",
                city: "",
                address: "",
                latitude: "",
                longitude: "",
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            }
        },
        mounted (){
            this.getVenues({pageSize: this.pageSize});
            if(localStorage.getItem("isLogin") == 'true'){
                // alert("true")
                this.$store.commit(LOGIN, {login: true});
            }
            // this.$router.push('/venues');
        },
        computed:{
            ...mapState(["venues"]),
            ...mapState(["pageSize"]),
            ...mapState(["currentPageVenues"]),
            ...mapState(["pageLoading"])
        },
        methods: {
            ...mapActions(['getVenues']),
            ...mapActions(['getVenueDetail']),

            onRouterLinkClick: function (venueId, meanStarRating, modeCostRating) {
                this.getVenueDetail({id: venueId, meanStarRating: meanStarRating, modeCostRating: modeCostRating});
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        },
        components:{
            Search,
            Pagination,
            VenueDetail
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
        border: 1px solid #EBEBEB;
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
