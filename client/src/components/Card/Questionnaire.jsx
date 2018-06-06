import React//, { Component } 
from 'react';
import Card from './Card';
import { 
    Grid, Row, Col//, Table 
} from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../Surveys/SurveyField.js';
import ChartistGraph from 'react-chartist';
import {dataPie, legendPie} from 'variables/Variables.jsx';

export class Questionnaire extends Card {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }
    getContents() {
        return (
            <div>
                <div className="question" style={{ margin: '0% 2%' }}>
                    <Field
                        key="test"
                        component={SurveyField}
                        type="text"
                        placeholder="Add Question"
                        label="Add Question"
                        name="add-question"
                    />
                </div>
                <Grid>
                    <Row>
                        <Col md={6}>
                            <div>
                                <div className="options" style={{ minWidth: '45%', display: 'block', margin: '1% 2%' }}>
                                    <Field
                                        key="option1"
                                        component={SurveyField}
                                        type="text"
                                        placeholder="Option"
                                        label="Option"
                                        name="add-option"
                                    />
                                </div>
                                <div className="options" style={{ minWidth: '45%', display: 'block', margin: '0% 2%' }}>
                                    <Field
                                        key="option2"
                                        component={SurveyField}
                                        type="text"
                                        placeholder="Option"
                                        label="Option"
                                        name="add-option"
                                    />
                                </div>
                                <div className="options" style={{ minWidth: '45%', display: 'block', margin: '0% 2%' }}>
                                    <Field
                                        key="option3"
                                        component={SurveyField}
                                        type="text"
                                        placeholder="Option"
                                        label="Option"
                                        name="add-option"
                                    />
                                </div>
                                <div style={{marginLeft:'2%', backgroundColor:'#0F0', borderRadius:'50%', width:'40px', height:'40px', color:'white', textAlign:'center', paddingTop:'2%', cursor:'pointer'}}>+</div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div style={{ display: 'inline-block, flex:1' }}>
                                <ChartistGraph data={dataPie} type="Pie" />
                                <div className="legend">
                                    {this.createLegend(legendPie)}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    getRightHeader() {
        return (
            <button className="btn btn-success btn-fill" type="submit">Add Question</button>
        );
    }
}

export default reduxForm({
    form: 'surveyForm',
})(Questionnaire);
