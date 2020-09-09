// store/index.js
// https://www.smashingmagazine.com/2020/01/data-components-vue-js/#emitting-custom-events-share-data-child-parent
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
 state: {
     user: {
      username: 'kinnaird',
      fullName: 'Kinnaird McQuade'
   }
 },
 getters: {
   firstName: state => {
     return state.user.fullName.split(' ')[0]
   }
 },
 mutations: {
    changeName (state, payload) {
     state.user.fullName = payload
   }
 },
 actions: {
        changeName (context, payload) {
     setTimeout(() => {
       context.commit("changeName", payload);
     }, 2000);
   }
 }
});