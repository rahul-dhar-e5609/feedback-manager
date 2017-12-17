//SurveyField contains login to render a single label and text input
import React, { Component } from 'react';

//props from reduxForm
//console.log(props)
/**
 * input => input props we entered in parent comp
 * label => label that we sent down in parent comp
 * meta => meta values eg. error from reduxForm
 */
export default ({input, label, meta: {error, touched}}) => {
    //console.log("Meta", meta);
    //touched prop of meta -> clicked into it and clicked out
    /**
     * we shall use the touched prop to make sure that the error message only gets displayed
     * when the user has touched the form field, as reduxForm takes it that the form fields
     * are all invalid when the form first boots up
     * 
     * Validation will keep running in the background, but we
     * dont want the users to see any nasty messages
     */
    return (
        <div>
            <label>{label}</label>
            <input  {...input} style={{marginBottom:'5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    )
}