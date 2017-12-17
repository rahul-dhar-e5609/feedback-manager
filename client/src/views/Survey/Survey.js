import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardHeader, CardBlock, Button} from "reactstrap";

import SurveyNew from '../../components/Surveys/SurveyNew.js';

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
    console.log("Rendering survey");
    return (
        <div className="animated fadeIn">
            <SurveyNew />
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
