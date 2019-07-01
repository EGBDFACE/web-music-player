import * as types from '../mutationTypes';

const recommand = { 
    state: {
        // 排行榜
        leaderboard: [],
        // 精品歌单
        highqualityPlaylist: [],
        // 推荐歌单
        recommandPlaylist: [],
        // 网友精选碟
        topPlaylist: []
    },
    mutations: {
        [types.SET_LEADERBOARD](state,value){
            state.leaderboard = value;
        },
        [types.SET_HIGH_QUALITY_PLAYLIST](state,value){
            state.highqualityPlaylist = value;
        },
        [types.SET_RECOMMAND_PLAYLIST](state,value){
            state.recommandPlaylist = value;
        },
        [types.SET_TOP_PLAYLIST](state,value){
            state.topPlaylist = value;
        }
    },
    actions: {
        setLeaderBoard({commit,state},value){
            const newLeaderBoard = JSON.parse(JSON.stringify(state.leaderboard));
            let existFlag = false;
            for(let i=0; i<newLeaderBoard.length; i++){
                if(newLeaderBoard[i].id === value.id){
                    existFlag = true;
                    break;
                }
            }
            if(!existFlag){
                newLeaderBoard.push(value);
            }
            commit(types.SET_LEADERBOARD, newLeaderBoard);
            // commit(types.SET_LEADERBOARD,value);
        },
        setHighQualityPlaylist({commit},value){
            commit(types.SET_HIGH_QUALITY_PLAYLIST,value);
        },
        setRecommandPlaylist({commit},value){
            commit(types.SET_RECOMMAND_PLAYLIST,value);
        },
        setTopPlaylist({commit},value){
            commit(types.SET_TOP_PLAYLIST,value);
        }
    }
}

export default recommand;