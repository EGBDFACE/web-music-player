import axios from 'axios';
import { commonParams,options } from '@/assets/public/constant.js';

//https://www.jianshu.com/p/41d39ad4b1e2
//跨域获取qq音乐歌单接口

const recommand = {
    state:{},
    mutations: {
        getRecommand(){}
    },
    actions: {
        getRecommand({ commit }){
            // const url = '/api/test';
            // const data = Object.assign({},commonParams,{
            //     g_tk: 5381
            // });
            const url = '/api/getDiscList';
            const data = Object.assign({},commonParams,{
                platform: 'yqq',
                hostUin: 0,
                sin: 0,
                ein: 29,
                sortId: 5,
                needNewCode: 0,
                categoryId: 10000000,
                rnd: Math.random(),
                format: 'json'
            });
            axios.get(url,{ params: data }).then((res)=>{
                console.log(res.data)
            })
        }
    }
}

export default recommand;