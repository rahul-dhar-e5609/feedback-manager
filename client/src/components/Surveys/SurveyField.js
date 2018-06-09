//SurveyField contains login to render a single label and text input
import React, { Component }
    from 'react';
import {
    FormGroup, HelpBlock,
    ControlLabel, FormControl
} from 'react-bootstrap';
//import { FormInputs } from 'components/FormInputs/FormInputs.jsx';

//props from reduxForm
//console.log(props)
/**
 * input => input props we entered in parent comp
 * label => label that we sent down in parent comp
 * meta => meta values eg. error from reduxForm
 */
class SurveyField extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.getFieldHTML = this.getFieldHTML.bind(this);
    }

    componentDidMount() {
        if (this.props.fieldvalue !== "") {
            this.setState({ value: this.props.fieldvalue });
        }
    }

    getValidationState(touched, error) {
        console.log("T->" + this.props.label, touched);
        if (touched && error) return 'error';
        else if (touched && this.state.value === '' ) { return 'error' }
        else if (touched && !error) return 'success';
        return null;
    }

    getFieldHTML() {

        const { input, label, type, placeholder, meta: { error, touched } } = this.props;

        if (type === "textarea") {
            return (
                <FormGroup
                    validationState={this.getValidationState(touched, error)}
                >
                    <ControlLabel>{label}</ControlLabel>
                    <FormControl
                        {...input}
                        rows="5"
                        value={this.state.value}
                        componentClass={type}
                        bsClass="form-control"
                        placeholder={placeholder}
                        onChange={(e) => { this.setState({ value: e.target.value }) }}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>{touched && error}&nbsp;</HelpBlock>
                </FormGroup>
            );
        }

        return (
            <FormGroup
                validationState={this.getValidationState(touched, error)}
            >
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    {...input}
                    type={type}
                    value={this.state.value}     //todo: need to see why the value attribute is not working
                    bsClass="form-control"
                    placeholder={placeholder}
                    onChange={(e) => { this.setState({ value: e.target.value }) }}
                />
                <FormControl.Feedback />
                <HelpBlock>{touched && error}&nbsp;</HelpBlock>

            </FormGroup>
        );
    }

    render() {

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
        return (
            <div>
                {this.getFieldHTML()}
            </div>
        )
    }
}

export default SurveyField;