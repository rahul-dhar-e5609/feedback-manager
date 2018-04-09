//shows users their form inputs for review
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions/index.js';
import Card from 'components/Card/Card.jsx';
import {
  Grid, Row, Col, Table
} from 'react-bootstrap';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history, onSuccess }) => {

    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name} style={{display: 'inline-flex'}}>
                <label style={{minWidth: '100px'}}>{label}</label>
                <div style={{marginLeft:'5%', marginBottom: '5px', height: '30px', width: '250px'}}>
                    {formValues[name]}
                </div>
            </div>
        );
    });
    const SurveyButtons = {
        margin: '2%'
    };
    const fieldStyle = {
        margin: 'auto',
        textAlign: 'center'
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
                                                    submitSurvey(formValues, history, onSuccess)
                                                }
                                                className="btn btn-success btn-fill"
                                            >
                                                Send Survey
                                            </button>
                                            <button
                                                className="btn btn-info btn-fill"
                                                style={SurveyButtons}
                                            >
                                                Question
                                            </button>
                                            <button
                                                className="btn btn-warning btn-fill"
                                                onClick={onCancel}
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
                                            <h5>Please confirm your entries</h5>
                                            {reviewFields}
                                            <br/>
                                        </div>
                                    }
                                />
                            </Col>
                        </Row>
                    </Grid>
        </div>
    );
};

function mapStateToProps({form}){
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
export default connect(mapStateToProps, actions) ((SurveyReview));