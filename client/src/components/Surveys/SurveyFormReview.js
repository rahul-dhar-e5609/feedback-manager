//shows users their form inputs for review
import React, { Component } from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions/index.js';
import Card from 'components/Card/Card.jsx';
import Questionnaire from 'components/Card/Questionnaire.jsx';
import {
    Grid, Row, Col, Table
} from 'react-bootstrap';

//const SurveyReview = ({ onCancel, formValues, submitSurvey, history, onSuccess }) => {}

class SurveyReview extends Component {

    render() {

        const SurveyButtons = {
            margin: '2%'
        };
        const fieldStyle = {
            margin: '2%',
            padding: '2%',
            textAlign: 'center',
            flex: '1',
            display: 'inline-block',
            zoom: '1',
            minWidth: '45%',
            overflowWrap: 'auto',
        }

        return (

            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Add Survey"
                                headerRight={
                                    <div>
                                        <button
                                            style={SurveyButtons}
                                            onClick={
                                                /**
                                                 * adding arrow function instead of simply
                                                 * using
                                                 * onClick={submitSurvey(formValues)}
                                                 * because if we had done something like that 
                                                 * then the submitSurvey would have been called the seconf the 
                                                 * component is rendered, using anonymous arrow func just to tell the interpreted
                                                 * that this funcis to be called on the action
                                                 * 
                                                 * sending history object to action creator so that the action creator knows where to route the
                                                 * applocation on successfullt sending all the surveys
                                                 */
                                                () =>
                                                    this.props.submitSurvey(this.props.formValues, this.props.history, this.props.onSuccess)
                                            }
                                            className="btn btn-success btn-fill"
                                        >
                                            Send Survey
                                            </button>
                                        <button
                                            className="btn btn-warning btn-fill"
                                            onClick={this.props.onCancel}
                                            style={SurveyButtons}
                                        >
                                            Back
                                            </button>
                                    </div>
                                }
                                category="You can add a new survey here."
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <div style={fieldStyle}>
                                        <u><h5>Survey Details</h5></u>
                                        {this.reviewFields()}
                                        <br />
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Questionnaire
                                title="Questions"
                                category="You can add questions for the survey here."
                                ctTableFullWidth ctTableResponsive
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    reviewFields() {
        return (
            _.map(formFields, ({ name, label }) => {
                return (
                    <div key={name} style={{ display: 'inline-flex' }}>
                        <label style={{ minWidth: '100px' }}>{label}</label>
                        <div style={{ marginLeft: '5%', marginBottom: '5px', height: '30px', width: '250px' }}>
                            {this.props.formValues[name]}
                        </div>
                    </div>
                );
            })
        );
    }
}

function mapStateToProps({ form }) {
    return {
        formValues: form.surveyForm.values
    };
}

/**
 * We need to redirect out apps control to dashboard when the user clicks on the 
 * send survey button, but this component does not know anything about the router
 * 
 * The routing logic is defined in the Full.js that tells the app to route to the 
 * survey component, using withRouter helper function to access the history object
 * now history object is passed as props
 */
export default connect(mapStateToProps, actions)((SurveyReview));