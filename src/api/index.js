import axios from 'axios';
import { BASE_URL } from '@/assets/constant.js';

export function getSongDetail(songId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/song/detail?ids=${songId}`
    })
    // .catch( err => {
    //     console.error(err.message);
    // })
}
export function getSongAudio(songId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/song/url?id=${songId}`
    })
}
export function getSongLyric(songId){
    return axios({
        method: 'get',
        baseURL: BASE_URL,
        url: `/lyric?id=${songId}`
    })
}