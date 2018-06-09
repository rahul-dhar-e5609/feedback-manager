//SurveyNew shows SurveyForm and SurveyView
import React, { Component } from 'react';
import SurveyForm from './SurveyForm.js';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
//import { connect } from 'react-redux';
//import compose from 'recompose/compose'
//import withProps from 'recompose/withProps'


class SurveyNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showFormReview: false
        };
    }
    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview
                history={this.props.history}
                onCancel={
                    () =>
                        this.setState({ showFormReview: false })
                }
                onSuccess={
                    () =>
                        this.props.handleNotifications("tr", "The Survey has been created successfully!", 1)
                }
            />
        }
        return <SurveyForm
            onSurveySubmit={
                () =>
                    this.setState({ showFormReview: true })
            }
        />;
    }

    render() {
        return (
            <div className="content">
                {this.renderContent()}
            </div>
        )
    }
}

/**
 * Since we had set destroyOnUnmount as false in the SurveyForm.js comp
 * The form data would never be dumped, when the user would click on Next button, the data
 * would persist and the user wouldget to choose, if the data is correct and the user could modify the 
 * data by clicking the back button, but in case the user cancels the form submition, the data would still not be dumped
 * 
 * Now, if the user revisits the form, the user would see the earlier data,
 * Now we can call an action on the click of the cancel button which would simply dump our data, but there can me multiple ways
 * of unmounting our form other than clickng the cancel button, like what if user tries to see the dashboard or if the user tries
 * to go to the payment section, it is not advisable to put an action for every event
 * 
 * So Voila! The Trick
 * 
 * Used reduxForm helper function and added it to the SurveyNewComponent with option
 * form: 'surveyForm'
 * 
 * Why it works?
 * 
 * SurveyForm component has an option destroyOnUnmount that prevents the reduxForm from dumping any of the values
 * so when the toggling happens between SurveyForm and SurveyFormReview, the data is not dumped, now both these components
 * are the child components of this component which is the SurveyNew Component, So the rendering of both these child comps is
 * happening inside this component, importing the reduxForm in this component here gives us the access to our reduxForm helper function
 * which we have used and have bound this component to it, but here is the catch, we have not specified the destroyOnUnmount to be true and that is why, when this
 * component is unmounted or whenever control is shifted from this component the form details related to form with name surveyForm are dumped
 * 
 * 
 * SWEET!
 */

export default reduxForm({
    form: 'surveyForm'
})(withRouter(SurveyNew));


/*
export default //compose(
    withProps((ownProps) => {
        console.log("Survey NEW  [WithProps]", ownProps);
        return { ...ownProps }
    }),
    
    reduxForm({
        form: 'surveyForm'
    })
    withRouter(SurveyNew)
//);
*/