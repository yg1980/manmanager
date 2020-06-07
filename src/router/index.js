import Vue from 'vue'
import VueRouter from 'vue-router'

// @ 在配置里配好的/src  == @ ????
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import User from '../views/users/user.vue'
// =================
/*
element ui  菜单 router 无效,
还要测试 编程时导航 是否有效?
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
*/
// =================

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    children:[
      {
        name:'user',
        path:'user',
        component:User
      }
    ]
  },
    {
    name: 'login',
    path: '/login',
    component: Login
  },
  // {
  //   path:'*',
  //   redirect:'home'
  // }
]
const router = new VueRouter({
  routes
})

export default router
