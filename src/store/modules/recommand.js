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
        topPlaylist: [],
        // showPlaylistSongsFlag: false,
        playlistSongs: []
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
        },
        [types.SET_PLAYLIST_SONGS](state,value){
            state.playlistSongs = value;
        },
        // [types.DEL_RECOMMAND_ALL_PLAYLIST_ITEM](state,value){
        //     state.playlistSongs = value;
        // },
        // [types.DEL_RECOMMAND_PLAYLIST_ITEM](state,value){
        //     state.playlistSongs = value;
        // },
        // [types.SEL_RECOMMAND_ALL_PLAYLIST_ITEM](state,value){
        //     state.playlistSongs = value;
        // },
        // [types.SEL_RECOMMAND_PLAYLIST_ITEM](state,value){
        //     state.playlistSongs = value;
        // }
        // [types.SET_SHOW_PLAYLIST_SONGS_FLAG](state,value){
        //     state.showPlaylistSongsFlag = value;
        // }
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
        },
        setPlaylistSongs({commit},value){
            // console.log(value);
            commit(types.SET_PLAYLIST_SONGS,value);
        },
        // delRecommandAllPlaylistItem(){

        // },
        // delRecommandPlaylistItem(){

        // },
        // selRecommandAllPlaylistItem(){

        // },
        // selRecommandPlaylistItem(){

        // }
        // setShowPlaylistSongsFlag({commit},value){
        //     commit(types.SET_SHOW_PLAYLIST_SONGS_FLAG,value);
        // }

    }
}

export default recommand;