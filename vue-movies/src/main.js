import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import routes from "@/routes/routes"
import mdb from "@/api/api";

Vue.config.productionTip = false

Vue.filter('apiImage', mdb.getImagePath)

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
