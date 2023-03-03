import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from './router'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

extend('required', {
  ...required,
  validate: value => {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1,
    };
  },
  message: 'Este campo é obrigatório'
})

extend('min', {
  ...min,
  validate: value => {
    return {
      valid: value.length >= 8,
    }
  }
})

extend('email', {
  ...email,
  validate: value => {
    return {
      valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    };
  },
  message: 'Este campo deve ser um email válido'
})

