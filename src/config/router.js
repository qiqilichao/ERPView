import Vue from 'vue'
import App from '../App.vue'
import Login from '../compontents/Login/login'
import VueRouter from 'vue-router'

//Vue组件使用Vue-router组件
Vue.use(VueRouter)

//路由数组
var routes=[{path:"/App",component:App},
  {path: "/Login",component: Login}, {path: "/",component: Login}];
//路由管理器
export default new VueRouter({
  routes
});



