import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

import VueResource from 'vue-resource'
Vue.use(VueResource)

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})
