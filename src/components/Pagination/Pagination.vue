<template>
    <div id="SearchResultPagination">
        <ul>
            <li class="nextPage" @click="onClick">
                <a><</a>
            </li>
            <li class="nextPage" @click="onClick">
                <a>></a>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Pagination",
        data (){
            return{
                number: ""
            }
        },
        methods: {
            onClick: function () {

            }
        }
    }
</script>

<style scoped>
    #SearchResultPagination{
        display: flex;
        font-family: 'Open Sans';
        font-weight: 500 !important;
        font-size: 14px !important;
        margin: 0 0 10px 0 !important;
    }
    .nextPage {
        -webkit-box-pack: center !important;
        -webkit-box-align: center !important;
        align-items: center !important;
        background-color: transparent !important;
        box-shadow: rgb(0, 132, 137) 0px 0px 0px 1px inset !important;
        color: rgb(0, 132, 137) !important;
        display: flex !important;
        height: 25px !important;
        justify-content: center !important;
        width: 25px !important;
        border-radius: 50% !important;
        cursor: pointer;
    }
</style>
