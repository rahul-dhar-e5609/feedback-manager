import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Card from 'components/Card/Card.jsx';
import {
  Grid, Row, Col, Table
} from 'react-bootstrap';
import { fetchSurveys } from '../../actions/index.js';
import SurveyList from '../../components/Surveys/SurveyList.js';
import Button from 'elements/CustomButton/CustomButton.jsx';

class Survey extends Component {

  componentDidMount(){
    this.props.fetchSurveys();
}
  render() {
      const SurveyButtons = {
          margin: '2%',
          right: '2%'
      };
      const th = {
        'Title':'',
        'Subject':'',
        'Date': ''
      }
      
      console.log("Survey Props", this.props);
      return (
          <div className="content">
              <Grid fluid>
                  <Row>
                      <Col md={12}>
                          <Card
                              title="Survey Listing"
                              headerRight={
                                <Row>
                                  <Col mdOffset={3}>
                                    <Link className="btn btn-info btn-fill" style={SurveyButtons} to="/home/survey/add">Create New</Link>
                                  </Col>
                                </Row>
                              }
                              category="This table consists of all the surveys."
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
                                                      this.props.surveys.reverse().map((prop, key) => {
                                                        console.log("Properties", prop);
                                                          return (
                                                              <tr key={key}>{
                                                                  Object.keys(prop).map((key, index) => {
                                                                      if(key == 'dateSent'){
                                                                        
                                                                        return (
                                                                          <td key={index}>
                                                                              {new Date(prop[key]).toLocaleDateString()}
                                                                          </td>
                                                                      );
                                                                      }else{
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
      );
  }
}

function mapStateToProps({auth, surveys}, ownProps) {
  return {
    auth,
    surveys
  }
}
export default connect(mapStateToProps, { fetchSurveys }) (Survey);
