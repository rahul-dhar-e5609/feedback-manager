import React, { Component } from 'react';
import { Field } from 'redux-form';
import SurveyField from '../Surveys/SurveyField.js';
import {
    Row//, Col//, Table
} from 'react-bootstrap';

function FieldGroup(props) {
    return (
        <div>
            <Field
                component={SurveyField}
                {...props}
            />
        </div>
    );
}

class SurveyInputs extends Component {
    
    render() {
        var row = [];
        for (var i = 0; i < this.props.ncols.length; i++) {
            row.push(
                <div key={i} className={this.props.ncols[i]}>
                    <FieldGroup 
                        {...this.props.proprieties[i]}
                    />
                </div>
            );
        }
        return (
            <Row>
                {row}
            </Row>
        );
    }
}

export default SurveyInputs;
