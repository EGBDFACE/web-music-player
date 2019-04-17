import axios from 'axios';
// import * as constant from '@/assets/constant';
import { BASE_URL } from '@/assets/constant';
import * as types from '../mutationTypes';

const search = {
    state: {
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
            console.log(value);
            state.searchResult = value;
        },
        [types.SEL_ALL_SEARCH_RESULT_ITEM](state,value){
            state.searchResult = value;
        },
        [types.DEL_ALL_SEARCH_RESULT_ITEM](state,value){
            state.searchResult = value;
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
        }
    }
}

export default search;