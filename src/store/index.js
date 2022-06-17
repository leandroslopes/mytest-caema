import Vue from 'vue'
import Vuex from 'vuex'
import cities from './modules/cities';
import cities_combox from './modules/cities_combox';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cities,
        cities_combox
    }
})