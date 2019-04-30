import * as types from '../mutationTypes';

const onPlay = {
    state: {
        onPlayList: []
    },
    mutations: {
        [types.SET_PLAY_LIST](state,value){
            state.onPlayList = value;
        },
        [types.SEL_PLAY_LIST_ITEM](state,value){
            state.onPlayList = value;
        },
        [types.SEL_ALL_PLAY_LIST_ITEM](state,value){
            state.onPlayList = value;
        },
        [types.DEL_PLAY_LIST_ITEM](state,index){
            state.onPlayList.splice(index,1);
        },
        [types.DEL_ALL_PLAY_LIST_ITEM](state,value){
            state.onPlayList = value;
        }
    },
    actions: {
        setPlayList({commit,state},value){
            let newList = JSON.parse(JSON.stringify(state.onPlayList));
            if(isArray(value)){
                for(let i=0; i<value.length; i++){
                    let existItemFlag = false;
                    for(let j=0; j<state.onPlayList.length; j++){
                        if(state.onPlayList[j].id === value[i].id){
                            existItemFlag = true;
                            break;
                        }
                    }
                    if(!existItemFlag){
                        newList.push({
                            ...value[i],
                            selected: false
                        });
                    }
                }
                commit(types.SET_PLAY_SONG,value[0]);
            }else{
                if(state.onPlayList.length === 0){
                    newList.push({
                        ...value,
                        selected: false
                    })
                }else{
                    let existFlag = false;
                    for(let i=0; i<state.onPlayList.length; i++){
                        if(state.onPlayList[i].id === value.id){
                            existFlag = true;
                            break;
                        }
                    }
                    if(!existFlag){
                        newList.push({
                            ...value,
                            selected: false
                        });
                    }
                }
                commit(types.SET_PLAY_SONG,value);
            }
            commit(types.SET_PLAY_LIST,newList);
        },
        selPlayListItem({commit,state},index){
            let value = JSON.parse(JSON.stringify(state.onPlayList));
            value[index].selected = !value[index].selected;
            commit(types.SEL_PLAY_LIST_ITEM,value);
        },
        selAllPlayListItem({commit,state}){
            let v = false;
            for(let i=0; i<state.onPlayList.length; i++){
                if(!state.onPlayList[i].selected){
                    v = true;
                }
            }
            let value = state.onPlayList.map(item=>{
                return {
                    ...item,
                    selected: v
                }
            });
            commit(types.SEL_ALL_PLAY_LIST_ITEM,value);
        },
        delPlayListItem({commit},index){
            commit(types.DEL_PLAY_LIST_ITEM,index);
        },
        delAllPlayListItem({commit,state}){
            let value = [], index = 0;
            for(let i=0; i<state.onPlayList.length; i++){
                if(!state.onPlayList[i].selected){
                    value[index++] = state.onPlayList[i];
                }
            }
            commit(types.DEL_ALL_PLAY_LIST_ITEM,value);
        }
    }
}

function isArray(something){
    return Object.prototype.toString.call(something) === '[object Array]';
}

export default onPlay;