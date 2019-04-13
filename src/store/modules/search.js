import axios from 'axios';
// import * as constant from '@/assets/constant';
import { BASE_URL } from '@/assets/constant';

const search = {
    state: {
        // hotSearch:[],
        // searchContext: '',
        // searchHistory: [],
        // searchSuggest: {}
        // inputFocus: false
        searchResult: []
    },
    getters: {
        // hotSearchString: state => {
        //     return state.hotSearch.map((value)=> value.first)
        // }
        // hotSearchString: function(state){
        //     let fiveHotSearch = [];
        //     if(state.hotSearch.length != 0){
        //         for(let i=0;i<5;i++){
        //             fiveHotSearch.push(state.hotSearch[i].first);
        //         }
        //     }
            // console.log(fiveHotSearch);
        //     return fiveHotSearch;
        // },
        // searchContext: function(state){
        //     return state.searchContext;
        // },
        // searchHistory: function(state){
        //     return state.search
        // }
    },
    mutations: {
        setSearchResult(state,value){
            state.searchResult = value;
        },
        delSearchResultItem(state,index){
            state.searchResult.splice(index,1);
        },
        selSearchResultItem(state,index){
            // state.searchResult = JSON.parse(JSON.stringify(state.searchResult));
            state.searchResult = state.searchResult.map((value,i)=>{
                if(i === index){
                    return {
                        ...value,
                        selected: !value.selected
                    }
                }else{
                    return {
                        ...value
                    }
                }
            });
        },
        selAllSearchResultItem(state){
            // console.log(v);
            let v = false;
            for(let i=0;i<state.searchResult.length;i++){
                if(!state.searchResult[i].selected){
                    v = true;
                }
            }
            state.searchResult = state.searchResult.map(value=>{
                return{
                    ...value,
                    selected: v
                }
            });
        }
        // getHotSearch(state,resultHot){
        //     // console.log(state);
        //     // console.log(resultHot);
        //     state.hotSearch.push(...resultHot);
        // },
        // getSearchSuggest(state,args){
        //     console.log(args);
        //     if(!args){
        //         console.log('clear');
        //         state.searchContext = '';
        //         state.searchSuggest = {};
        //     }else{
        //         state.searchSuggest = JSON.parse(args.resResult);
        //         state.searchContext = args.input;
        //     }
            // console.log(inputValue);
            // if(!inputValue){
            //     console.log('clear');
            //     state.searchContext = '';
            // }
            // if(resSuggest){
            //     state.searchSuggest = JSON.parse(resSuggest);
            // }else{
            //     state.searchSuggest = {};
            // }
        // },
        // setSearchContext(state,inputValue){
            // if(state.searchHistory.indexOf(inputValue) != -1){
            //     state.searchHistory.push(inputValue);
            // }
            // state.searchContext = inputValue;
        // },
        // getSearchResult(state,inputValue){
        //     if((state.searchHistory.indexOf(inputValue) === -1)&&(inputValue)){
        //         state.searchHistory.push(inputValue);
        //     }
        //     state.searchContext = inputValue;
        // },
        // searchInputFocus(state){
        //     state.inputFocus = true;
        // },
        // searchInputBlur(state){
        //     state.inputFocu
        // }
    },
    actions: {
        // getHotSearch({ commit }){
        //     axios({
        //         method: 'get',
        //         // baseURL: constant.BASE_URL,
        //         baseURL: BASE_URL,
        //         url: '/search/hot'
        //     }).then(response=>{
        //         // console.log(response);
        //         commit('getHotSearch',response.data.result.hots);
        //     })
        // },
        // getSearchSuggest({commit},realtimeInput){
        //     axios({
        //         method: 'get',
        //         baseURL: BASE_URL,
        //         url: `/search/suggest/?keywords=${realtimeInput}`
        //     }).then(response=>{
        //         console.log(response);
        //         // console.log(response.data.result);
        //         // console.log(JSON.stringify(response.data.result));
        //         let args = {
        //             resResult: JSON.stringify(response.data.result),
        //             input: realtimeInput
        //         };
        //         commit('getSearchSuggest',args);
        //         // commit('getSearchSuggest',JSON.stringify(response.data.result));
        //     }).catch(err=>{
        //         commit('getSearchSuggest','')
        //         console.error(err.message);
        //     })
        // },
        // // setSearchContext({commit},selectedValue){
        //     // axios({

        //     // })
        //     // commit('setSearchContext',selectedValue);
        // // },
        // getSearchResult({commit},selectedValue){
        //     axios({
        //         method: 'get',
        //         baseURL: BASE_URL,
        //         url: `/search/?keywords=${selectedValue}`
        //     }).then(response=>{
        //         console.log(response);
        //         commit('getSearchResult',selectedValue);
        //     }).catch(err=>{
        //         console.error(err.message);
        //     });
        // }
    }
}

export default search;