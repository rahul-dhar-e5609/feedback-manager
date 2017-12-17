//shows users their form inputs for review
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions/index.js';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow white-text btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            <button
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
                    submitSurvey(formValues, history)
                }
                className="green white-text btn-flat right"
            >
                Send Survey
            </button>
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