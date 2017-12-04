import {combineReducers} from 'redux';
import authReducer from './authReducer';
import redirectReducer from './redirectUrlReducer';

export default combineReducers({
  auth: authReducer,
  redirectUrl: redirectReducer
});
