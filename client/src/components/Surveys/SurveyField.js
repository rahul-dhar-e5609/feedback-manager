//SurveyField contains login to render a single label and text input
import React//, { Component } 
from 'react';
import {
    //FormGroup, 
    ControlLabel, FormControl
} from 'react-bootstrap';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';

//props from reduxForm
//console.log(props)
/**
 * input => input props we entered in parent comp
 * label => label that we sent down in parent comp
 * meta => meta values eg. error from reduxForm
 */
//export default (export default ({input, fieldvalue, label, type, placeholder, meta: {error, touched}}) => {) => {
export default (props) => {
    //console.log("Meta", meta);
    //touched prop of meta -> clicked into it and clicked out
    /**
     * we shall use the touched prop to make sure that the error message only gets displayed
     * when the user has touched the form field, as reduxForm takes it that the form fields
     * are all invalid when the form first boots up
     * 
     * Validation will keep running in the background, but we
     * dont want the users to see any nasty messages
     * 
     * <label>{label}</label>
     * <input  {...input} style={{marginLeft:'5%', marginBottom: '5px', height: '30px', width: '250px'}}/>     
     */
    console.log(props);
    const {input, fieldvalue, label, type, placeholder, meta: {error, touched}} = props;
    return (
        <div>
            {getFieldHTML(type, fieldvalue, label, placeholder, input)}
            <div style={{ color: 'red'}}>
                {touched && error}&nbsp;
            </div>

        </div>
    )
}

function getFieldHTML(type, fieldvalue, label, placeholder, input){
    if(type === "textarea"){
        return (
            <div>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...input} rows="5" componentClass={type} bsClass="form-control" placeholder={placeholder}/>
            </div>
        );
    }
    console.log("value: ", fieldvalue);
    return (    
        <div>
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                type={type}
                value={fieldvalue}
                placeholder={placeholder}
                {...input}
            />
        </div>
    );
}