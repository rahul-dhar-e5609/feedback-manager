import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'
import {connect} from 'react-redux';
import Full from '../../containers/Full/';


const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const is_authenticated = (auth) => {
  switch(auth){
    case null:
      return null;
    case false:
      return false;
    default:
      return true;
  }
}
const getCorrectComp = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      const auth = is_authenticated(rest.auth);
      if( auth != null){
        if(auth == true){
          return (
            renderMergedProps(component, routeProps, rest)
          );
        }else if(auth == false){
          return (
            <Redirect to={{
              pathname: '/login',
              state: { from: routeProps.location }
            }}/>
          );
        }
      }
    }}/>
  );
}

const PrivateRoute = ({ component, ...rest }) => {
  const comp = getCorrectComp({ component, ...rest });
  console.dir(rest);
  if(is_authenticated(rest.auth) != null){
    return comp;
  }
  return null;
};

function mapStateToProps({auth}, ownProps){
  return {
    auth,
    path:ownProps.path,
    component:ownProps.component
  };
}
export default connect(mapStateToProps)(PrivateRoute);
