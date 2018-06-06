import React from 'react';
import ReactDOM from 'react-dom';

// import {
//     BrowserRouter,
//     Route,
//     Redirect,
//     Switch
// } from 'react-router-dom';

import FeedbackManager from 'containers/FeedbackManager/FeedbackManager.jsx';
// import Login from './views/Login/Login.jsx';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';



const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
ReactDOM.render((
    <Provider store={store}>
        <FeedbackManager />
    </Provider>
), document.getElementById('root'));
console.log("STRIPE key is ", process.env.REACT_APP_STRIPE_KEY);
console.log("Environment is ", process.env.NODE_ENV);