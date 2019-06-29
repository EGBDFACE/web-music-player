// import * as types from '../mutationTypes';

// const detail = {
//     state: {
//         artist: { 
//             albums: [],
//             desc: {},
//             info: {},
//             mvs: [],
//             songs: []
//         }
//     },
//     mutations: {
//         [types.SET_ARTIST_SONGS](state,value){
//             state.artist.songs = value;
//         },
//         [types.SET_ARTIST_MVS](state,value){
//             state.artist.mvs = value;
//         },
//         [types.SET_ARTIST_ALBUMS](state,value){
//             state.artist.albums = value;
//         },
//         [types.SET_ARTIST_DESC](state,value){
//             state.artist.desc = value;
//         },
//         [types.SET_ARTIST_INFO](state,value){
//             state.artist.info = value;
//         }
//     },
//     actions: {
//         setArtistAlbums({commit},value){
//             const artistAlbums = {
//                 // artistId: value.artist.id,
//                 hotAlbums: value.hotAlbums,
//                 hasMore: value.more
//             };
//             commit(types.SET_ARTIST_ALBUMS,artistAlbums)
//         },
//         setArtistDesc({commit},value){
//             const artistDesc = {
//                 brief: value.briefDesc,
//                 introduction: value.introduction
//             };
//             commit(types.SET_ARTIST_DESC, artistDesc);
//         },
//         setArtistMvs({commit},value){
//             const artistMvs = {
//                 // artistId: value.artist.id,
//                 hasMore: value.hasMore,
//                 mvs: value.mvs
//             };
//             commit(types.SET_ARTIST_MVS,artistMvs);
//         },
//         setArtistSongs({commit},value){
//             const artistSongs = {
//                 // artistId: value.artist.id,
//                 hotSongs: value.hotSongs,
//                 hasMore: value.more
//             };
//             commit(types.SET_ARTIST_SONGS, artistSongs);
//         },
//         // setArtistInfo({commit,state},value){
//         setArtistInfo({commit},value){
//             const artist = {
//                 id: value.id,
//                 name: value.name,
//                 picUrl: value.picUrl
//             }
//             commit(types.SET_ARTIST_INFO,artist);
//         }
//     }
// }

// export default detail;