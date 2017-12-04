import React, {Component} from 'react';
import {createBrowserHistory} from 'history';
import {setRedirectUrl} from '../../actions';
const browserHistory = createBrowserHistory();
import {connect} from 'react-redux';
import {Route} from 'react-router-dom'

import Full from '../Full/';
class EnsureLoggedInContainer extends Component {
  componentDidMount() {
    console.dir(this.props);
    const { dispatch, currentURL } = this.props

    if (!this.props.auth) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      console.log("Not logged in Reirection URL: "+currentURL);
      dispatch(setRedirectUrl(currentURL))
      browserHistory.replace("/login")
    }else {
      console.log("User is logged in (Ensure Logged in comp)");
    }
  }

  render() {
    if (this.props.auth) {
      return <Route path="/home" component={Full}/>;
    } else {
      return null
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
  console.log("Current path in Ensure Logged in Comp: "+ownProps.location.pathname);
  return {
    auth: state.auth,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)
