import { FETCH_USER } from '../actions/types';
export default function(state = null, action){
  switch (action.type) {
    case FETCH_USER:
      //an empty string is interpreted to be false
      // so "" || false returns false
      return action.payload || false;
    default:
      return state;
  }
}
