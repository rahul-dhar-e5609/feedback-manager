import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HeaderLinks extends Component {
    handleSelect(eventKey) {
    }
    render() {
        
        return (
            <div>
                <Nav pullRight bsStyle="tabs" onSelect={k => this.handleSelect(k)}>
                    <NavItem eventKey={1} href="#">
                        <img alt="avatar" style={{ width: '35px', height: '35px', borderRadius: '50px' }} src={this.props.auth.avatar} />
                    </NavItem>
                    <NavDropdown eventKey={2} title={this.props.auth.firstName + " " + this.props.auth.lastName} id="basic-nav-dropdown-right">
                        <MenuItem eventKey={2.1} >
                            <Link to="/home/payments" style={{ color: '#9A9A9A' }} ><i className="pe-7s-cash"></i> Payments</Link>
                        </MenuItem >
                        <MenuItem eventKey={2.2}>
                            <Link to="/home/survey" style={{ color: '#9A9A9A' }} ><i className="pe-7s-speaker"></i> Surveys</Link>
                        </MenuItem >
                        <MenuItem eventKey={2.3}>
                            <Link to="/home/user" style={{ color: '#9A9A9A' }} ><i className="pe-7s-user"></i> Profile</Link>
                        </MenuItem >
                        <MenuItem divider />
                        <MenuItem eventKey={2.4} href="/api/logout">
                            <i className="fa fa-lock"></i> Log Out
                        </MenuItem >
                    </NavDropdown>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
