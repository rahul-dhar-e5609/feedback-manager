import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


class HeaderLinks extends Component{
    render(){
        
        return ( 
            <div>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">Account</NavItem>
                    <a href="/api/logout"><i className="fa fa-lock"></i> Log Out</a>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
