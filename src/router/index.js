import Vue from 'vue'
import VueRouter from 'vue-router'

// @ 在配置里配好的/src  == @ ????
import Login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/home',
    component: home
  },
    {
    name: 'login',
    path: '/login',
    component: Login
  }
]
const router = new VueRouter({
  routes
})

export default router
