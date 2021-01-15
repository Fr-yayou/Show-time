import Vue from 'vue'
import Vuex from 'vuex'
import Concert from "./modules/concerts"
import Users from "./modules/users"
import Group from "./modules/groups"
import Feedbacks from "./modules/feedbacks"
import createPersistedState from "vuex-persistedstate"
import Auth from "./modules/auth"


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules:{
    Auth,
    Users,
    Concert,
    Group,
    Feedbacks
  }
})
