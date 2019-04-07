import axios from 'axios';
import Vue from 'vue';
import jsonp from '@/assets/public/jsonp.js';
import { commonParams,options,ERR_OK } from '@/assets/public/constant.js';

const search = {
    state: {
        hotSearch:[],
    },
    mutations: {
        getHotSearch(state,resultHot){
            console.log(state);
            console.log(resultHot);
            state.hotSearch.push(...resultHot);
        }
    },
    actions: {
        getHotSearch({ commit }){
            const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
            const data = Object.assign({},commonParams,{
                uin: 0,
                platform: 'yqq',
                needNewCode: 1
            });
            // const url = 'https://music.163.com/weapi/search/hot';
            // const url = 'https://music.163.com/api/song/detail/?ids=%5B5244704%5D';
            // const data = {
            //     type: 1111
            // };
            jsonp(url,data,options).then((res)=>{
            // jsonp(url,null,options).then((res)=>{
                if(res.code === ERR_OK){
                    console.log(res);
                }
            });
            // const data = {
            //     // s: '海阔天空',
            //     // type: 1,
            //     // limit: 30,
            //     // offset: 0
            //     type: 1111
            // };
            // console.log('action');
            // Vue.jsonp('https://music.163.com/weapi/search/hot',data).then(json=> {
            //     console.log(json);
            // }).cache(err=>{
            //     console.error(err.message);
            // });
            // console.log('end');
            // jsonp('https://music.163.com/weapi/search/hot',data,(err,data)=>{
            //     if(err) {
            //         console.error(err.message);
            //     }else{
            //         console.log('run');
            //         console.log(data);
            //     }
            // })
            // axios({
            //     method: 'post',
            //     // baseURL: constant.BASE_URL,
            //     // url: '/search/hot'
            //     url: 'https://music.163.com/weapi/search/get',
            //     data: data
            // }).then(response=>{
            //     console.log(response);
            //     // commit('getHotSearch',response.data.result.hots);
            // })
        }
    }
}

export default search;