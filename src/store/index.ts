import {createStore} from 'redux';
import Reducer from '../reducers';

export interface StoreState{
}

export const initialState:StoreState = {
};
let store = createStore(Reducer,initialState);
export default store;