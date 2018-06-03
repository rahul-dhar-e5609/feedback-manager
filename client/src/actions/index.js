//use axios to make ajax requests
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, FETCH_TRANSACTIONS } from './types';
import { SET_REDIRECTION_URL } from './types';

export const setRedirectUrl = (url) => {
  const action = {
    type: SET_REDIRECTION_URL,
    url
  }
  return action;
}
/*
Wonder why use reduxThunk?
action creator is expected to return an action directly which is then dispatched to all the reducers,
we have modified this flow such that we are now able to dispatch the action to our reducers when we feel good,
which is definitely when the get req as been completed
*/
export const fetchUser = () => {
  return function (dispatch) {
    axios.get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  }
}
//anonymous arrow function automatically returns the function or expression as there is no other code
//other than the return statement
//so no need to explicitly return the function
/*
export const fetchUser = () => async dispatch => {
  //returning a function instead of an object with type and payload props
  //whenever the function will be called, it will instantly return a function
  //when we wired up the reduxThunk middleware (src/index.js), it inspects whatever
  //value we return from this ation creator, if reduxThunk sees that we return a function instead
  //of a normal action, it will automatically call this function add pass the dispatch function
  //as an argument

  //we wish to call this the instant our app boots up
  //where to add this call?? ans => app component

  //rather than function keyword, adding arrow func, just stylistic
    console.log("inside async function");
    //we want to displatch as action, after this req as been completed successfully
    const res = await axios.get('/api/current_user');
    console.dir(res);
    dispatch({type: FETCH_USER, payload: res});
    //Could have been written like this
    //dispatch({type: FETCH_USER, payload: await axios.get('/api/current_user').data});
};
*/

export const handleToken = (token, onSuccess) => {
  return function (dispatch) {
    axios.post('/api/stripe', token)
      .then(res => {
        return dispatch({ type: FETCH_USER, payload: res.data });
      })
      .then(() => {
        onSuccess();
        dispatchTransactions(dispatch);
      });
  }
}

export const submitSurvey = (values, history, onSuccess) => {
  return function (dispatch) {
    axios.post('/api/surveys', values)
      .then(res => {
        history.push('/home/survey');
        dispatch({ type: FETCH_USER, payload: res.data })
        onSuccess();
      });
  }
}

export const fetchSurveys = () => {
  return function (dispatch) {
    axios.get('/api/surveys')
      .then(res => {
        console.log("Response for fetching surveys", res);
        dispatch({ type: FETCH_SURVEYS, payload: res.data })
      });
  }
}


export const fetchTransactions = () => {
  return function (dispatch) {
    dispatchTransactions(dispatch);
  }
}

const dispatchTransactions = (dispatch) => {
  axios.get('/api/transactions')
    .then(res => {
      console.log("Response for fetching transactionss", res);
      dispatch({ type: FETCH_TRANSACTIONS, payload: res.data })
    });
}