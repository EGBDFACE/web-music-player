import Vue from 'vue';
import Vuex from 'vuex';

import search from './modules/search';
import onPlay from './modules/onPlay';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        search: search,
        onPlay: onPlay
    }
});

export default store;