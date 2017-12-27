import React, { Component } from 'react';
import {connect} from 'react-redux';

import SurveyNew from '../../components/Surveys/SurveyNew.js';
import SurveyList from '../../components/Surveys/SurveyList.js';

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
            <SurveyList/>
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
