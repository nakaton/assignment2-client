<template>
    <div>
        <Search/>
        <div v-for="item in venues">
            <span>{{item.venueName}}</span>
        </div>
    </div>
</template>

<script>
    import Search from '../../components/Search/Search.vue'
    export default {
        name: "VenuesList",
        data (){
            return{
                error: "",
                errorFlg: false,
                venues: []
            }
        },
        mounted: function(){
            // this.getVenuesList();
        },
        methods: {
            getVenuesList: function () {
                this.$http.get('http://localhost:4941/api/v1/venues')
                    .then(function (response) {
                        this.venues = response.data;
                    }, function (error) {
                        this.error = error;
                        this.errorFlg = true;
                    });
            }
        },
        components:{
            Search
        }
    }
</script>

<style scoped>

</style>
