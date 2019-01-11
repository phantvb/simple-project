import Vue from 'vue'
import Vuex from 'vuex'
import createActivities from './modules/createActivities'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    createActivities
  }
});

export default store
