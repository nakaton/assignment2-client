<template>
    <div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
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
</style>
