import Vue from 'vue'
import Userlogin from './UserLogin.vue'
import './axios/axiosConfig'

Vue.config.productionTip = false

new Vue({
    render: h => h(Userlogin),
}).$mount('#login')

