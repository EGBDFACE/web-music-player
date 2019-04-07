import Vue from 'vue';
import Vuex from 'vuex';

import search from './modules/search';
import recommand from './modules/recommand';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        search: search,
        recommand: recommand
    }
});

export default store;