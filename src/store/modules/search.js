import axios from 'axios';
import * as constant from '@/assets/constant';

const search = {
    state: {
        hotSearch:[],
    },
    getters: {
        // hotSearchString: state => {
        //     return state.hotSearch.map((value)=> value.first)
        // }
        hotSearchString: function(state){
            let fiveHotSearch = [];
            if(state.hotSearch.length != 0){
                for(let i=0;i<5;i++){
                    fiveHotSearch.push(state.hotSearch[i].first);
                }
            }
            // console.log(fiveHotSearch);
            return fiveHotSearch;
        }
    },
    mutations: {
        getHotSearch(state,resultHot){
            // console.log(state);
            // console.log(resultHot);
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
                // console.log(response);
                commit('getHotSearch',response.data.result.hots);
            })
        }
    }
}

export default search;