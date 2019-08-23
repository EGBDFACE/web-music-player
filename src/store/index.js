import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';

import comment from './modules/comment';
// import detail from './modules/detail';
import history from './modules/history';
import onPlay from './modules/onPlay';
import recommand from './modules/recommand';
import search from './modules/search';

import mutations from './mutations';

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        comment: comment,
        // detail: detail,
        history: history,
        onPlay: onPlay,
        recommand: recommand,
        search: search
    },
    state: {
        // 正在播放歌曲
        onPlaySong: {},
        // 播放状态：true表示正在播放，false表示暂停或未播放
        onPlayFlag: false,
    },
    actions,
    mutations
});

export default store;