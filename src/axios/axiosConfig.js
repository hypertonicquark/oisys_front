import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'

const axiosInstance = Axios.create({
    baseURL: 'http://127.0.0.1:8086', //请求基准路径
    timeout: 0,//永不超时   
    withCredentials: true //跨域请求携带cookie

});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        self.location.href = '/login.html';
    }
    return Promise.reject(error)
})
Vue.use(VueAxios, axiosInstance);
export default axiosInstance;