import * as types from './mutationTypes';
import store from './index';

const actions = {
    setPlaySong({commit},value){
        commit(types.SET_PLAY_SONG,value);
        store.dispatch('setPlayList',value);
    }
}
export default actions;