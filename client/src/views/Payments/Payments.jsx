import React, { Component } from "react";
//import Widget from '../../components/Widgets/Widgets.js';
import MakePayment from '../../components/Payments/Payments.js';
import { connect } from 'react-redux';
import Card from 'components/Card/Card.jsx';
import { Link } from 'react-router-dom';
import {
  Grid, Row, Col, Table
} from 'react-bootstrap';


import { fetchTransactions } from '../../actions/index.js';

class Payments extends Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }
  render() {
    console.log("PROPS [PAYMENT]", this.props);
    const th = {
      'Email': '',
      'Date': '',
      'Credits': '',
      'Amount': ''
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Payment Transactions"
                headerRight={
                  <Row>
                    <Col mdOffset={2}>
                      <span className="category">{"Avaliable Credits: " + this.props.auth.credits}</span>
                      <MakePayment handleNotifications={this.props.handleNotifications} />
                    </Col>
                  </Row>
                }
                category="This table consists of all the transactions made for the credits."
                ctTableFullWidth ctTableResponsive
                content={
                  <Grid fluid>
                    <Row>
                      <Table striped hover>
                        <thead>
                          <tr>
                            {
                              Object.keys(th).map((prop, key) => {
                                return (
                                  <th key={key}>{prop}</th>
                                );
                              })
                            }
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.transactions.map((prop, key) => {
                              //console.log("Properties", prop);
                              return (
                                <tr key={key}>{
                                  Object.keys(prop).map((key, index) => {
                                    if (key == 'creditedOn') {

                                      return (
                                        <td key={index}>
                                          {new Date(prop[key]).toLocaleDateString()}
                                        </td>
                                      );
                                    } else {
                                      return (
                                        <td key={index}>
                                          {prop[key]}
                                        </td>
                                      );
                                    }
                                  })
                                }</tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    </Row>
                  </Grid>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps({ auth, transactions }, ownProps) {
  console.log("Own Props [Payment]", ownProps);
  return {
    auth,
    transactions
  }
}
export default connect(mapStateToProps, { fetchTransactions })(Payments);
