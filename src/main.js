import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router'
import VueResource from 'vue-resource'
import App from './App.vue'
import store from './store'

Vue.use(ElementUI);
Vue.use(VueResource)

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})
