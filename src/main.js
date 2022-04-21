import Vue from 'vue'
import App from './App.vue'
import '@/mobile/flexible.js'
import '@/styles/reset.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
