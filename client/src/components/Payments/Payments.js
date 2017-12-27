import React, {Component} from 'react';
import Button from 'elements/CustomButton/CustomButton.jsx';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../../actions';
class MakePayment extends Component{
  render() {
    //gives actual javascript code
    //debugger;
    return (
      <StripeCheckout
        name="Feedback Manager"
        description="$1.00 for 10 email credits "
        amount={100}
        token={
          token =>
          this.props.handleToken(token)
        }
        stripeKey = {process.env.REACT_APP_STRIPE_KEY}
      >
        <Button color="primary"><i className="fa fa-money"></i>{'\u00A0'} Add Credits</Button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(MakePayment);
