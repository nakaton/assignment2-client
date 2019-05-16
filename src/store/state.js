export default {
    login: false,
    pageSize: 12,
    pageLoading: true,
    groupPageVenues:[],
    currentPageVenues: [],
    venues: [],
    currentVenueDetail:{
        venueName:"",
        admin:{
            userId:"",
            username:""
        },
        category:{
            categoryName:"",
            categoryDescription:""
        },
        city: "",
        shortDescription:"",
        longDescription:"",
        dateAdded:"",
        address:"",
        latitude:"",
        longitude:"",
        photos:[],
        meanStarRating:0,
        modeCostRating:0
    },
    currentVenueReviews: [],
    currentUser:{
        get UserId(){
            return localStorage.getItem("currentUser_id");
        },
        get UserToken(){
            return localStorage.getItem("currentUser_token");
        },
        get UserLoginStatus(){
            return localStorage.getItem("isLogin");
        },
        get UserPhoto(){
            return localStorage.getItem("currentUser_photo");
        }
    }
}
