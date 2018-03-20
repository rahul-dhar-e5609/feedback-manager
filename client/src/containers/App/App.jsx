import React, { Component } from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import {connect} from 'react-redux';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import {style} from "variables/Variables.jsx";

import appRoutes from 'routes/app.jsx';

class App extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.is_authenticated = this.is_authenticated.bind(this);
        this.sidebarMenuLinks = this.sidebarMenuLinks.bind(this);
        this.state = {
            _notificationSystem: null
        };
    }
    sidebarMenuLinks(){

    }
    handleNotificationClick(position){
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
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
                    Welcome to <b>Feedback Manager</b> - a way of getting feedback from your customers.
                </div>
            ),
            level: level,
            position: position,
            autoDismiss: 15,
        });
    }
    componentDidMount(){
        this.setState({_notificationSystem: this.refs.notificationSystem});
        var _notificationSystem = this.refs.notificationSystem;
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
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
        if(_notificationSystem)
        _notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Welcome to <b>Feedback Manager</b> - a way of getting feedback from your customers.
                </div>
            ),
            level: level,
            position: "tr",
            autoDismiss: 15,
        });
    }
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
        console.log("Props", this.props);
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
                        <NotificationSystem ref="notificationSystem" style={style}/>
                        <Sidebar {...this.props} />
                        <div id="main-panel" className="main-panel">
                            <Header {...this.props}/>
                                <Switch>
                                    {
                                        appRoutes
                                    //    .filter((prop) => prop.isSidebarMenuLink === true )
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
                                                                handleClick={this.handleNotificationClick}
                                                            />}
                                                    />
                                                );
                                            if(prop.redirect)
                                                return (
                                                    <Redirect from={prop.path} to={prop.to} key={key}/>
                                                );
                                            return (
                                                <Route exact path={prop.path} component={prop.component} key={key}/>
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
    //console.log("Own Props", ownProps);
    return {
      auth,
      ...ownProps
    }
  }
  
  export default connect(mapStateToProps)(App);
