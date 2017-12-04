import React, {Component} from "react";
import {Row, Col, CardGroup} from "reactstrap";
import Widget from '../../components/Widgets/Widgets.js';
import MakePayment from '../../components/Payments/Payments.js';
import {connect} from 'react-redux';

class Payments extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Widget color="danger" variant="inverse" header={"Credits: "+this.props.auth.credits} smallText="">
            <small className="text-muted">Lorem Ipsum</small>
          </Widget>
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
