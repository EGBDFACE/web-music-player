import * as types from './mutationTypes';

const mutations = {
    [types.SET_PLAY_SONG](state,value){
        state.onPlaySong = value;
    },
    [types.SET_PLAY_FLAG](state,value){
        state.onPlayFlag = value;
    }
}
export default mutations;