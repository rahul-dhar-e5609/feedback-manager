import { SET_REDIRECTION_URL } from '../actions/types';
export default function(state = null, action){
  switch (action.type) {
    case SET_REDIRECTION_URL:
      return action.url;
    default:
      return state;
  }
}
