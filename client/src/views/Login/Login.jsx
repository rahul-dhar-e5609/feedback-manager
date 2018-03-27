import React, {Component} from "react";
import { Row, Col, Grid, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import {Link} from 'react-router-dom';
import Button from 'elements/CustomButton/CustomButton.jsx';
import {Card} from 'components/Card/Card.jsx';
import logo from 'assets/img/logo.png';

class Login extends Component {
  render() {
    const loginOuterCSS = {
          //  height:'100%',
            backgroundColor:'#eee',
          //  width:'100%'
    };
    const loginInnerCSS = {
      justifyContent: 'center',
      flexwrap: 'wrap',
      marginTop: '0%',
      display:'flex'
    };
    return (
      <div className="content" style={loginOuterCSS}>
      <Grid>
            <Row  style={loginInnerCSS}>
              <Col md={6}>
                <img style={{width:'50%', display: 'block', margin: '0 auto'}} src={logo}/>
                <Card
                //customStyle={{minWidth: '50%'}}
                  title="Login"
                  ctTableResponsive
                  category="Sign in to your account"
                  content={
                    <div>
                          <FormGroup>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                              type="text"
                              id="Username"
                              //value={this.state.value}
                              placeholder="username"
                              //onChange={this.handleChange}
                            />
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                              type="password"
                              id="password"
                              //value={this.state.value}
                              placeholder="Password"
                              //onChange={this.handleChange}
                            />
                                <Button
                                    bsStyle="success"
                                    fill
                                    type="submit"
                                    style={{marginTop: '3%'}}
                                >
                                  Login
                                </Button>
                                <div className="clearfix"></div>
                          </FormGroup>
                      <h4>or login with...</h4>
                      <Row>
                        <Col style={{textAlign: 'center'}}>
                          <a  href="/auth/google">
                            <Button fill bsStyle="danger" >
                            <i className="fa fa-google-plus"></i>&nbsp;&nbsp;Login with Google
                            </Button>
                          </a>
                        </Col>
                      </Row>
                    </div>
                  }
                />
                </Col>
                <Col md={6} style={{display:'none'}}>
                <Card customStyle={{backgroundColor:'#187DA0', color: '#fff'}}
                  ctTableResponsive
                  content={
                    <div>
                    <div>
                      <img style={{width:'50%', display: 'block', margin: '0 auto'}} src={logo}/>
                    </div>
                    <h2 style={{textAlign: 'center'}}>Sign up</h2>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <div style={{textAlign: 'center'}}>
                      <Button  
                          bsStyle="warning"
                          fill
                      >
                        Register
                      </Button>
                    </div>
                    </div>
                  }
                />
              </Col>
            </Row>
      </Grid>
      </div>
    );
  }
}

export default Login;
