import Vue from 'vue';
import Vuex from 'vuex';

import search from './modules/search';
import onPlay from './modules/onPlay';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        search: search,
        onPlay: onPlay
    },
    state: {
        onPlaySong: {}
    },
    actions,
    mutations
});

export default store;