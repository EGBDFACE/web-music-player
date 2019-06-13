import * as types from './mutationTypes';
import store from './index';

const actions = {
    setPlayFlag({commit},value){
        commit(types.SET_PLAY_FLAG,value);
    },
    setPlaySong({commit},value){
        commit(types.SET_PLAY_SONG,value);
        // store.dispatch('setPlayList',value);
    }
}
export default actions;