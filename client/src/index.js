import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

import FeedbackManager from './components/FeedbackManager/FeedbackManager.js';
// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
  // Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'

import axios from 'axios';
window.axios = axios;
//first param = reducers
//second param =  initial state
//third param = applyMiddleware
//
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render((
  <Provider store={store}>
    <FeedbackManager />
  </Provider>
), document.querySelector('#root'));
console.log("Stripe key: " + REACT_APP_STRIPE_KEY);
