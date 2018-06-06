import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import NotificationSystem from 'react-notification-system';

import { style } from "variables/Variables.jsx";

import App from '../App/App.jsx';
import Login from '../../views/Login/Login.jsx';
//import Register from '../../views/Register';

class FeedbackManager extends Component {

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null
    };
  }
  handleNotificationClick(position, message = "Welcome to <b>Feedback Manager</b>", errcode = 4) {
    var level;
    switch (errcode) {
      case 1:
        level = 'success';
        break;
      case 2:
        level = 'warning';
        break;
      case 3:
        level = 'error';
        break;
      case 4:
        level = 'info';
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: (<span data-notify="icon" className="pe-7s-gift"></span>),
      message: (
        <div>
          {message}
            </div>
      ),
      level: level,
      position: position,
      autoDismiss: 3,
    });
  }


  componentDidMount() {
    //first the connect function mapDispatchToProps is called
    //it assigns the props to the component from the dispatch
    //function, and then we call this fetchUser() function in the
    //props
    this.props.fetchUser();
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    //var _notificationSystem = this.refs.notificationSystem;
  }

  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" style={style} />
        <BrowserRouter>
          <Switch>
            <Route path="/home" name="Home"  
              render = { routeProps => 
                <App 
                  {...routeProps}
                  handleNotifications={this.handleNotificationClick}
                />
              }
              />
            <Route path="/login" name="Login" component={Login} />
            <Redirect to="/home" from="/" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}

export default connect(null, actions)(FeedbackManager);


