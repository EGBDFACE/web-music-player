const onPlay = {
    state: {
        onPlayList: []
    },
    mutations: {
        setOnPlayList(state,value){
            if(isArray(value)){
                for(let i=0;i<value.length;i++){
                    for(var j=0;j<state.onPlayList.length;j++){
                        if(state.onPlayList[j].id === value[i].id){
                            break;
                        }
                    }
                    if(j === state.onPlayList.length){
                        state.onPlayList.push({
                            ...value[i],
                            selected: false,
                            onPlayFlag: (i === 0) ? true : false
                        });
                    }
                }
            }else{
                for(let i=0;i<state.onPlayList.length;i++){
                    if(state.onPlayList[i].id === value.id){
                        return null;
                    }
                }
                state.onPlayList = state.onPlayList.map(v=>{
                    return {
                        ...v,
                        onPlayFlag:false,
                        selected: false
                    }
                });
                state.onPlayList.push({
                    ...value,
                    onPlayFlag: true,
                    selected: false
                });
            }
        },
        selPlayListItem(state,index){
            state.onPlayList = JSON.parse(JSON.stringify(state.onPlayList));
            state.onPlayList[index].selected = !state.onPlayList[index].selected;
        },
        selAllPlayListItem(state){
            let v = false;
            for(let i=0;i<state.onPlayList.length;i++){
                if(!state.onPlayList[i].selected){
                    v = true;
                }
            }
            state.onPlayList = state.onPlayList.map(value=>{
                return{
                    ...value,
                    selected: v
                }
            });
        },
        delPlayListItem(state,index){
            state.onPlayList.splice(index,1);
        }
    }
}

function isArray(something){
    return Object.prototype.toString.call(something) === '[object Array]';
}

export default onPlay;