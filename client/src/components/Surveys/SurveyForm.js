//Shows a form for a user to add inout
import React, { Component } from 'react';
//much like connect function, helps our component to communicate with the store at the top of our app
//enclosed with the Provider tag
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField.js';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails.js';
import formFields from './formFields';
import Card from 'components/Card/Card.jsx';
import {
    Grid, Row, Col, Table
} from 'react-bootstrap';
import DOMPurify from 'dompurify';

class SurveyForm extends Component {

    mapOverFields() {
        const fieldContainer = {
            margin: '2%',
            /*borderBottom: '1px solid #eee',
            padding: '2%',
            textAlign: 'center',*/
            flex: '1',
            display: 'inline-block',
            zoom: '1',
            minWidth: '45%',
            overflowWrap: 'auto',
        }
        const field = {
        }
        return _.map(formFields, ({ label, name, type, placeholder }) => {
            return <div key={name}
                style={fieldContainer}>
                <div style={field}>
                    <Field
                        key={name}
                        component={SurveyField}
                        type={type}
                        placeholder={placeholder}
                        label={label}
                        name={name}
                    />
                </div>
            </div>
        })
    }

    renderFields() {
        return <div style={{}}>
            {this.mapOverFields()}
        </div>
    }

    render() {
        const SurveyButtons = {
            margin: '2%'
        };
        return (
            /**
             * had we added paranthesis after this.props.onSurveySubmit in handleSubmit
             * js interpreter would have called that functionthe second it read that
             * 
             * but we wish to call it only when the form is submitted so that the state
             * in the parent component can be toggeled so that the review comp is shown
             *  
             * to see the values submitted do this
             * {this.props.handleSubmit(values => console.log(values))}
             */
            <div className="content">
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                >
                    <div >
                        <Grid fluid>
                            <Row>
                                <Col md={12}>
                                    <Card
                                        title="Add Survey"
                                        headerRight={
                                            <Row>
                                                <Col mdOffset={3}>
                                                    <button className="btn btn-success btn-fill" style={SurveyButtons} type="submit">Next </button>
                                                    <Link className="btn btn-danger btn-fill" style={SurveyButtons} to="/home/survey">Cancel</Link>
                                                </Col>
                                            </Row>
                                        }
                                        category="You can add a new survey here."
                                        ctTableFullWidth ctTableResponsive
                                        content={
                                            this.renderFields()
                                        }
                                    />
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </form>
            </div>
        )
    }
}

// values => object of all different values coming off of our form
function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    /**
    *   In case we intend to do it in a stupid way :P 
    *   if(!values.body){
    *       errors.body = 'You must provide a body';
    *   }
    *
    * to reference a property on an object on the fly, 
    * at run time, we use []
    * values.name -> means looking at the name property, just the name property
    * eg {name:''} -> the name that goes here
    * 
    * but we wish to figure out the key that we are trying to look at
    * every single time that we run through this loop
    * 
    */
    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            /**
             * we can add fields specific errors by adding another
             * property to our formFields array and then fetching that prop in this foreach loop
             * using es16 destructuring like, { name, noValidInput}
             * error[name] = noValidInputs 
             */
            errors[name] = 'You must provide a value!';
        }
    });

    /**
     * return obj to communicate to out reduxForm
     * if reduxForm gets empty errors object, it will assume the whole form is valid
     * if any props in errors object, reduxForm assumes that form is some how invalid
     */
    return errors;
    /**
     * When we return the errors object, reduxForm looks closelt to this object and
     * checks if the prop in the object matches any of our form's field's names,
     * If it does, it sends the error to that particulat Field Component as a form
     * 
     * ReduxForm automatically connects the dots
     */
}

/**
 * only takes one arg
 * validate -> the function that will validate out form fields
 */
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false // don't dump the form, keep the values when the form is unmounted
})(SurveyForm);