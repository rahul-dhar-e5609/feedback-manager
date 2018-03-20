import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (
            <footer className="footer">
                <Grid>
                    <p className="copyright">
                        &copy; {(new Date()).getFullYear()} Created By <a href="#">Rahul Dhar</a>
                    </p>
                </Grid>
            </footer>
		);
	}
}

export default Footer;
