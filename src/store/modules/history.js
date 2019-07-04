import * as types from '../mutationTypes';

const history = {
    state: {
        historyList: []
    },
    mutations: {
        [types.SET_HISTORY_LIST](state,value){
            state.historyList = value;
        }
    },
    actions: {
        setHistoryList({commit,state},value){
            let newList = JSON.parse(JSON.stringify(state.historyList));
            // let existItemFlag = false;
            // for(let i=0; i<newList.length; i++){
            //     if(newList[i].id === value.id){
            //         existItemFlag = true;
            //         break;
            //     }
            // }
            // if(!existItemFlag){
            //     newList.push({
            //         ...value,
            //         selected: false
            //     })
            // }
            // commit(types.SET_HISTORY_LIST,newList);
            if(isArray(value)){
                for(let i=0; i<value.length; i++){
                    let existItemFlag = false;
                    for(let j=0; j<state.historyList.length; j++){
                        if(state.historyList[j].id === value[i].id){
                            existItemFlag = true;
                            break;
                        }
                    }
                    if(!existItemFlag){
                        newList.push({
                            ...value[i],
                            selected: false
                        })
                    }
                }
                if(value.length === 0){
                    newList = [];
                }
            }else{
                if(state.historyList.length === 0){
                    newList.push({
                        ...value,
                        selected: false
                    })
                }else{
                    let existItemFlag = false;
                    for(let i=0; i<state.historyList.length; i++){
                        if(state.historyList[i].id === value.id){
                            existItemFlag = true;
                            break;
                        }
                    }
                    if(!existItemFlag){
                        newList.push({
                            ...value,
                            selected: false
                        })
                    }
                }
            }
            commit(types.SET_HISTORY_LIST,newList);
        }
    }
}

function isArray(something){
    return Object.prototype.toString.call(something) === '[object Array]';
}

export default history;