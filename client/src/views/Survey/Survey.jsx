import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  Grid, Row, Col,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import SurveyList from '../../components/Surveys/SurveyList.js';
import Button from 'elements/CustomButton/CustomButton.jsx';

class Survey extends Component {

  componentDidMount() {
    console.dir(this.props);
  }
  render() {
      /**
       * todo
       * Here the customer should view his list of surveys
       * and a button which they can click for adding a new one
       *
       * The list should have more of a widget based approach than a
       * list based approach
       *
       * Should have something like
       * <AddSurvey/>
       *
       * <SurveyList/>
       */
    return (
        <div className="animated fadeIn">
            <Grid fluid>
              <Row>
                  <Col md={2}>
                  
                  <Link className="btn btn-primary" to="/home/survey/add">Add Survey</Link>
                  </Col>
              </Row>
              <Row>
                <Col md={11}>
                  <SurveyList/>
                </Col>
              </Row>
            </Grid>
        </div>
    )
  }
}

function mapStateToProps({auth}, ownProps) {
  return {
    auth
  }
}
export default connect(mapStateToProps) (Survey);
