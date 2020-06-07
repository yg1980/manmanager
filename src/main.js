import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import MyHttpServer from './plugins/http'
import Moment from 'moment'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MyHttpServer)
Vue.filter('time_filter',function(val){
  return Moment(val).format('YYYY-MM-DD HH:mm:ss')
})
new Vue({
  router,

  render: h => h(App)
}).$mount('#app')
