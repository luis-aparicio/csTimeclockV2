import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from "axios";
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const base = axios.create({
  baseURL: "http://localhost:4000"
});

Vue.prototype.$http = base;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

