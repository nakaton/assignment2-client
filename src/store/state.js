export default {
    login: false,
    pageSize: 10,
    selectedCity: "",
    searchContent: "",
    pageLoading: true,
    groupPageVenues:[],
    currentPageVenues: [],
    venues: [],
    currentVenueDetail:{
        venueId: null,
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
        },
        get UserName() {
            return localStorage.getItem("userName");
        },
        get GivenName() {
            return localStorage.getItem("givenName");
        },
        get FamilyName() {
            return localStorage.getItem("familyName");
        },
        get Email() {
            return localStorage.getItem("email");
        }
    },
    categories: [],
}
