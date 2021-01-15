import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import vBlur from 'v-blur'

// FOR LOCAL USAGE
axios.defaults.baseURL = 'http://localhost:4000'

require('@/store/modules/subscriber')
Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(vBlur)


store.dispatch('attempt', localStorage.getItem('token')).then(() =>{
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
    }).$mount('#app')
})

