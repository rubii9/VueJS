import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex"
import storeConfig from "@/store/store"
import VueRouter from "vue-router"
import routes from "@/routes/routes"
import mdb from "@/api/api";

Vue.config.productionTip = false

Vue.filter('apiImage', mdb.getImagePath)

Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store(storeConfig)

const router = new VueRouter({
  // mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name === 'favourite') {
    if (store.getters['user/isAuthenticated']) {
      next()
    } else {
      next({name: 'popular'})
    }
  } else {
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
