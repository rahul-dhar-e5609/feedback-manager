import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import {style} from "variables/Variables.jsx";

import appRoutes from 'routes/app.jsx';

class App extends Component {
    
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    is_authenticated () {
        switch(this.props.auth){
          case null:
            return null;
          case false:
            return false;
          default:
            return true;
        }
      }
    render() {
        //console.log("Props [App]", this.props);
        const auth = this.is_authenticated();
        if( auth != null){
            if(auth == false){
                return (
                <Redirect to={{
                    pathname: '/login'
                }}/>
                );
            }else if (auth == true){
                return (
                    <div className="wrapper">
                        <Sidebar {...this.props} />
                        <div id="main-panel" className="main-panel">
                            <Header {...this.props}/>
                                <Switch>
                                    {
                                        appRoutes
                                        .map((prop,key) => {
                                            if(prop.name === "Notifications")
                                                return (
                                                    <Route
                                                        exact
                                                        path={prop.path}
                                                        key={key}
                                                        render={routeProps =>
                                                            <prop.component
                                                                {...routeProps}
                                                                handleClick={this.props.handleNotifications}
                                                            />}
                                                    />
                                                );
                                            if(prop.redirect)
                                                return (
                                                    <Redirect from={prop.path} to={prop.to} key={key}/>
                                                );
                                            return (
                                                <Route exact path={prop.path}
                                                render = { routeProps => 
                                                    <prop.component 
                                                      {...routeProps}
                                                      handleNotifications={this.props.handleNotifications}
                                                    />
                                                  }
                                                key={key}/>
                                            );
                                        })
                                    }
                                </Switch>
                            <Footer />
                        </div>
                    </div>
                );
            }
        }
        return null;     
    }
}

function mapStateToProps({auth}, ownProps) {
    //console.log("Auth", auth);
    //console.log("Own Props [App] ", ownProps);
    return {
      auth,
      ...ownProps
    }
  }
  
  export default connect(mapStateToProps)(App);
