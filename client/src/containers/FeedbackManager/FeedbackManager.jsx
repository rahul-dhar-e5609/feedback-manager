import React, {Component} from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom' 
import {connect} from 'react-redux';
import * as actions from '../../actions';

import App from '../App/App.jsx';
import Login from '../../views/Login/Login.jsx';
//import Register from '../../views/Register';

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
      <BrowserRouter>
            <Switch>
                <Route path="/home" name="Home" component={App}/>
                <Route path="/login" name="Login" component={Login}/>
                <Redirect to="/home" from="/"/>
            </Switch>
        </BrowserRouter>
    );
  }

}

export default connect(null, actions)(FeedbackManager);


