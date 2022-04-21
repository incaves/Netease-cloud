import Vue from 'vue'
import App from './App.vue'
import '@/mobile/flexible'
import '@/styles/reset.css'
import '@/utils/vant'
import router from '@/router'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
