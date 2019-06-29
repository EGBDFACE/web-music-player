import axios from 'axios';
// import * as constant from '@/assets/constant';
import { BASE_URL } from '@/assets/constant';
import * as types from '../mutationTypes';

const search = {
    state: {
        artist: { 
            albums: [],
            desc: {},
            info: {},
            mvs: [],
            songs: []
        },
        searchResult: []
    },
    getters: {
    },
    mutations: {
        [types.SET_SEARCH_RESULT](state,value){
            state.searchResult = value;
        },
        [types.DEL_SEARCH_RESULT_ITEM](state,index){
            state.searchResult.splice(index,1);
        },
        [types.SEL_SEARCH_RESULT_ITEM](state,value){
            // console.log(value);
            state.searchResult = value;
        },
        [types.SEL_ALL_SEARCH_RESULT_ITEM](state,value){
            state.searchResult = value;
        },
        [types.DEL_ALL_SEARCH_RESULT_ITEM](state,value){
            state.searchResult = value;
        },
        [types.SET_ARTIST_SONGS](state,value){
            state.artist.songs = value;
        },
        [types.SET_ARTIST_MVS](state,value){
            state.artist.mvs = value;
        },
        [types.SET_ARTIST_ALBUMS](state,value){
            state.artist.albums = value;
        },
        [types.SET_ARTIST_DESC](state,value){
            state.artist.desc = value;
        },
        [types.SET_ARTIST_INFO](state,value){
            state.artist.info = value;
            // state.artist.albumSize = value.albumSize;
            // state.artist.id = value.id;
            // state.artist.mvSize = value.mvSize;
            // state.artist.name = value.name;
            // state.artist.songSize = value.musicSize,
            // state.artist.picUrl = value.picUrl;
        }
    },
    actions: {
        setSearchResult({commit},value){
            commit(types.SET_SEARCH_RESULT,value)
        },
        selSearchResultItem({commit,state},index){
            console.log(state);
            let value = JSON.parse(JSON.stringify(state.searchResult));
            value[index].selected = !value[index].selected;
            commit(types.SEL_SEARCH_RESULT_ITEM,value);
        },
        selAllSearchResultItem({commit,state}){
            let v = false;
            for(let i=0; i<state.searchResult.length; i++){
                if(!state.searchResult[i].selected){
                    v = true;
                }
            }
            let value = state.searchResult.map(item=>{
                return{
                    ...item,
                    selected: v
                }
            });
            commit(types.SEL_ALL_SEARCH_RESULT_ITEM,value);
        },
        delAllSearchResultItem({commit,state}){
            let value = [], index = 0;
            for(let i=0; i<state.searchResult.length; i++){
                if(!state.searchResult[i].selected){
                    value[index++] = state.searchResult[i];
                }
            }
            commit(types.DEL_ALL_SEARCH_RESULT_ITEM,value);
        },
        delSearchResultItem({commit},index){
            commit(types.DEL_SEARCH_RESULT_ITEM,index);
        },
        setArtistAlbums({commit},value){
            const artistAlbums = {
                // artistId: value.artist.id,
                hotAlbums: value.hotAlbums,
                hasMore: value.more
            };
            commit(types.SET_ARTIST_ALBUMS,artistAlbums)
        },
        setArtistDesc({commit},value){
            const artistDesc = {
                brief: value.briefDesc,
                introduction: value.introduction
            };
            commit(types.SET_ARTIST_DESC, artistDesc);
        },
        setArtistMvs({commit},value){
            const artistMvs = {
                // artistId: value.artist.id,
                hasMore: value.hasMore,
                mvs: value.mvs
            };
            commit(types.SET_ARTIST_MVS,artistMvs);
        },
        setArtistSongs({commit},value){
            const artistSongs = {
                // artistId: value.artist.id,
                hotSongs: value.hotSongs,
                hasMore: value.more
            };
            commit(types.SET_ARTIST_SONGS, artistSongs);
        },
        // setArtistInfo({commit,state},value){
        setArtistInfo({commit},value){
            const artist = {
                albumSize: value.albumSize,
                id: value.id,
                mvSize: value.mvSize,
                name: value.name,
                songSize: value.musicSize,
                picUrl: value.picUrl
            }
            commit(types.SET_ARTIST_INFO,artist);
        }
    }
}

export default search;