import Vue from 'vue'
import App from './App.vue'
import Login from './compontents/Login/login'
import router from "./config/router"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from "axios";

import App2 from './App2'

Vue.use(ElementUI)

Axios.defaults.baseURL = "http://localhost:8888/" ;
Vue.prototype.$axios = Axios;

new Vue({
  el: '#app',
  router,
  render: h => h(App2)
})
