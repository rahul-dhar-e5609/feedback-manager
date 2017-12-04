import React, {PureComponent} from 'react';
import {Link, Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import {createBrowserHistory} from 'history';
import {setRedirectUrl} from '../../actions';
import {connect} from 'react-redux';
import Dashboard from '../../views/Dashboard';
import Payments from '../../views/Payments/Payments.js';

class Full extends PureComponent {

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
  componentDidMount() {
    console.log("Home container props", this.props);
    const { dispatch, currentURL } = this.props
    console.log("Dashboard: ", Dashboard);
  }

  render() {
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
          <div className="app">
            <Header />
            <div className="app-body">
              <Sidebar {...this.props}/>
              <main className="main">
                <Breadcrumb />
                <Container fluid>
                  <Route exact path="/home/dashboard" render={ props => {
                      console.log("Returning dashboard GUI");
                      return (
                        React.createElement(Dashboard)
                      );
                  }}/>
                  <Route exact path="/home/payments" render={ props => {
                      console.log("Returning payments GUI");
                      return (
                        React.createElement(Payments)
                      );
                  }}/>
                  <Redirect to="/home/dashboard" from="/home"/>
                </Container>
              </main>
              <Aside />
            </div>
            <Footer />
          </div>
        )
      }
    }else{
      return null;
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps({auth}, ownProps) {
  return {
    auth,
    currentURL: ownProps.location.pathname
  }
}

export default connect(mapStateToProps)(Full);
