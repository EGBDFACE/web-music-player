import * as types from './mutationTypes';

const mutations = {
    [types.SET_PLAY_SONG](state,value){
        state.onPlaySong = value;
    }
}
export default mutations;