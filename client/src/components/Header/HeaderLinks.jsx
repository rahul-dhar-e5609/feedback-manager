import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HeaderLinks extends Component {
    render() {
        if(this.props.auth == undefined){
            return (<div></div>);
        }
        return (
            <div>
                <Nav>
                    <NavItem eventKey={1}>
                        <Link to="/home/payments">Avaliable Credits:&nbsp; &nbsp;{this.props.auth.credits}</Link>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">
                        <img style={{ width: '35px', height: '35px', borderRadius: '50px' }} src={this.props.auth.avatar} />
                    </NavItem>
                    <NavDropdown eventKey={2} title={this.props.auth.firstName + " " + this.props.auth.lastName} id="basic-nav-dropdown-right">
                        <a href="/api/logout">
                                <i className="fa fa-lock"></i> Log Out
                        </a>
                    </NavDropdown>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
