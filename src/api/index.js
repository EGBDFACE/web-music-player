import axios from 'axios';
import { BASE_URL } from '@/assets/constant.js';

export function fetchSongDetail(songId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/song/detail?ids=${songId}`
    })
    // .catch( err => {
    //     console.error(err.message);
    // })
}
export function fetchSongAudio(songId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/song/url?id=${songId}`
    })
}
export function fetchSongLyric(songId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/lyric?id=${songId}`
    })
}
export function fetchSearchResult(keywords){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/search?keywords=${keywords}`
    })
}
export function fetchCheckMusic(id){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/check/music?id=${id}`
    })
}
export function fetchSearchSuggest(keywords){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/search/suggest/?keywords=${keywords}`
    })
}
export function fetchSearchHot(){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: '/search/hot'
    })
}
export function fetchArtistSongs(artistId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/artists?id=${artistId}`
    })
}
export function fetchArtistMvs(artistId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/artist/mv?id=${artistId}`
    })
}
export function fetchArtistAlbums(artistId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/artist/album?id=${artistId}`
    })
}
export function fetchArtistDesc(artistId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/artist/desc?id=${artistId}`
    })
}
// export function fetchPlaylistDetail(playlistId){
//     return axios({
//         method: 'get',
//         baseURL: BASE_URL,
//         url: `/playlist/detail?id=${playlistId}`
//     })
// }
export function fetchAlbumDetail(albumId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/album?id=${albumId}`
    })
}
export function fetchMvDetail(mvId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/mv/detail?mvid=${mvId}`
    })
}

// recommand 
export function fetchLeaderBoard(idx){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/top/list?idx=${idx}`
    })
}
export function fetchHighQualityPlaylist(){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: '/top/playlist/highquality'
    })
}
export function fetchRecommandPlaylist(){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: '/personalized'
    })
}
export function fetchTopPlaylist(){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: '/top/playlist'
    })
}
export function fetchPlaylistDetail(playlistId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/playlist/detail?id=${playlistId}`
    })
}

// comment
// export function fetchComment (musicId,offset, before) {
export function fetchComment (musicId, offset){
    let urlStr = `/comment/music?id=${musicId}`;
    if (offset) {
        urlStr += `&offset=${offset}`;
    }
    // if (before) {
    //     url += `&before=${before}`;
    // }
    return axios ({
        method: 'get',
        baseURL: BASE_URL,
        // url: `/comment/music?id=${musicId}&offset=${offset}&before=${before}`
        url: urlStr
    })
}