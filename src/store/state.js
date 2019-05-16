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
        get UserName(){
            return localStorage.getItem("currentUser_id");
        },
        get UserToken(){
            return localStorage.getItem("currentUser_token");
        }
    }
}
