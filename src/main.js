// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MsgBox from '@/plugins/msgbox'
import LefitImgLoad from '@/plugins/img-load'
import AlloyFinger from 'alloyfinger'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
Vue.config.productionTip = false
Vue.use(AlloyFingerVue, {
  AlloyFinger
})
Vue.use(MsgBox)
Vue.use(LefitImgLoad)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
