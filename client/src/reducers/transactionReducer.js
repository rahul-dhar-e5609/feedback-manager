import { FETCH_TRANSACTIONS } from '../actions/types';
export default function(state = [], action){
    switch (action.type) {
      case FETCH_TRANSACTIONS:
        return action.payload;
      default:
        return state;
    }
}