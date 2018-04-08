import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';


class HeaderLinks extends Component{
    render(){
        
        return ( 
            <div>
                <Nav pullRight>
                    <NavItem eventKey={1} href="#">
                        <img style={{width: '35px', height: '35px', borderRadius: '50px'}} src= {this.props.auth.avatar}/>
                    </NavItem>
                    <NavDropdown eventKey={2} title={this.props.auth.firstName + " " + this.props.auth.lastName} id="basic-nav-dropdown-right">
                        <MenuItem eventKey={2.2}>
                            <a href="/api/logout"><i className="fa fa-lock"></i> Log Out</a>
                        </MenuItem>
                    </NavDropdown>
                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
