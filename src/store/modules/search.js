import axios from 'axios';
import * as constant from '@/assets/constant';

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
            axios({
                method: 'get',
                baseURL: constant.BASE_URL,
                url: '/search/hot'
            }).then(response=>{
                console.log(response);
                commit('getHotSearch',response.data.result.hots);
            })
        }
    }
}

export default search;