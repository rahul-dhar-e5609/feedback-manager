import React, {Component} from 'react';
import {createBrowserHistory} from 'history';
import {connect} from 'react-redux';
import EnsureLoggedInContainer from '../../containers/EnsureLoggedInContainer/EnsureLoggedInContainer.js';
import Login from '../../views/Login';
import Register from '../../views/Register';

class App extends Component {

  componentDidUpdate(prevProps) {
    console.log("App.js ComponentDidUpdate");
    console.dir(this.props);
    console.dir(prevProps.props);
    const { dispatch, redirectUrl } = this.props
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

    console.log("isLoggingIn: "+isLoggingIn);
    console.log("isLoggingOut: "+isLoggingOut);

    if (isLoggingIn) {
      console.log("App.js User is logged in (Redirect URL): "+redirectUrl);
      dispatch(navigateTo(redirectUrl))
    } else if (isLoggingOut) {
      console.log("App.js User is not logged in (Redirect URL): "+redirectUrl);
      // do any kind of cleanup or post-logout redirection here
    }
  }

  render() {
    return (
      <div>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>

        <Route component={EnsureLoggedInContainer}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("State in App.js");
  console.dir(state);
  return {
    auth: state.auth,
    redirectUrl: state.redirectUrl
  }
}

export default connect(mapStateToProps)(App)
