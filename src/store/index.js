import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';

import detail from './modules/detail';
import onPlay from './modules/onPlay';
import search from './modules/search';

import mutations from './mutations';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        // detail: detail,
        onPlay: onPlay,
        search: search
    },
    state: {
        onPlaySong: {},
        onPlayFlag: false,
    },
    actions,
    mutations
});

export default store;