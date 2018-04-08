import {combineReducers} from 'redux';
import authReducer from './authReducer';
import {reducer as reduxForm} from 'redux-form';
import surveysReducer from './surveysReducer';
import transactionReducer from './transactionReducer';
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer,
  transactions: transactionReducer
});
