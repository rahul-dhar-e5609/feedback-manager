import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import PrivateRoute from '../PrivateRoute/PrivateRoute.js';
import Full from '../../containers/Full/';
import Login from '../../views/Login';
import Register from '../../views/Register';

/*
  modifying from functional component to class based component
  we wish to fetch user the very seconf out app gets rendered
  making class based so that we have access to life cycle method, which
  will be automatically called when the app gets rendered
*/
class FeedbackManager extends Component {

  componentDidMount(){
    //first the connect function mapDispatchToProps is called
    //it assigns the props to the component from the dispatch
    //function, and then we call this fetchUser() function in the
    //props
    this.props.fetchUser()
  }

  render(){
    return (
      <Router>
        <div>
          <Route path="/home" component={Full}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Redirect to="/home" from="/"/>
        </div>
      </Router>
    );
  }

}

//once we pass in all these actions, they will be assigned to the FM as props
// It is important to note that when connect renders successfully, you will be
// able to see that connect is now the parent component of the provided React
// component within the container file.
export default connect(null, actions)(FeedbackManager);


