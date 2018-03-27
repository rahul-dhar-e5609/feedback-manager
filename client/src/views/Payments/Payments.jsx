import React, {Component} from "react";
import {Row} from "react-bootstrap";
//import Widget from '../../components/Widgets/Widgets.js';
import MakePayment from '../../components/Payments/Payments.js';
import {connect} from 'react-redux';

class Payments extends Component {
  render() {
    return (
      <div className="content animated fadeIn">
        <Row>
          Credits:&nbsp; &nbsp;{this.props.auth.credits}
          <MakePayment/>
        </Row>
      </div>
    )
  }
}

function mapStateToProps({auth}, ownProps) {
  return {
    auth
  }
}
export default connect(mapStateToProps)(Payments);
