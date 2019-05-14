<template>
    <div class="pagination" v-if="this.venues.length > 0">
        <el-pagination
            @current-change="handleCurrentChange"
            background
            :current-page="this.$parent.currentPageNum"
            :page-size="this.pageSize"
            layout="prev, pager, next"
            :total="this.venues.length">
        </el-pagination>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {
        CURRENT_PAGE_VENUES
    } from '../../store/mutations-types'

    export default {
        name: "Pagination",
        methods: {
            handleCurrentChange(val) {
                // console.log(`Current Page No.: ${val}`);
                // console.log("groupPageVenues: " + this.groupPageVenues[val - 1])
                // console.log("currentPageVenues: " + this.currentPageVenues)
                this.$store.commit(CURRENT_PAGE_VENUES, {currentPageVenues: this.groupPageVenues[val - 1]});
                this.$parent.currentPageNum = val;
            }
        },
        computed: {
            ...mapState(["venues"]),
            ...mapState(["pageSize"]),
            ...mapState(["groupPageVenues"]),
            ...mapState(["currentPageVenues"])
        }
    }
</script>

<style scoped>
    .pagination {
        text-align:center;
    }
</style>
