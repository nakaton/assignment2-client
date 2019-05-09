<template>
    <div id="toolbar">
        <div id="searchbar">
            <span>
                City :
            </span>
            <select>
                <option value="Christchurch">Christchurch</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Shanghai">Shanghai</option>
            </select>
            <form>
                <input type="search" placeholder="Key Word">
                <input type="submit" v-on:click="onSubmit">
            </form>
        </div>
        <div id="loginbar">
            <ul>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/login">Register</a>
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
                this.$parent.getVenuesList();
            }
        }
    }
</script>

<style scoped>
    #toolbar{
        display: flex;
        align-items: center;
        text-decoration: none;
    }
    #searchbar {
        display: flex;
        float: left;
        color:red;
    }
    #loginbar{
        display: flex;
    }
    #loginbar li{
        padding: 0 24px 0 0;
        list-style: none;
        float: right;
    }
</style>
