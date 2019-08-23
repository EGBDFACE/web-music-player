import * as types from '../mutationTypes';

const comment = {
    state: {
        comments: []
    },
    mutations: {
        [types.SET_COMMENT_LIST](state,value) {
            state.comments = value;
        },
    },
    actions: {
        setComments({commit,state},value) {
            commit(types.SET_COMMENT_LIST,value);
        }
    }
}
export default comment;