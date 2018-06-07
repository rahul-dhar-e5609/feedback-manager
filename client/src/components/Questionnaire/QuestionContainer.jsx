import React, { Component } 
from 'react';
//import Card from '../Card/Card.jsx';
import { 
    Grid, Row, Col//, Table 
} from 'react-bootstrap';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../Surveys/SurveyField.js';
import ChartistGraph from 'react-chartist';
import {dataPie, legendPie} from 'variables/Variables.jsx';
import Question from './Question.jsx';
import Option from './Option.jsx';

export class QuestionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: 'Where did you hear about us?',
            options:[{'value':'Newspapers'},{'value':'Friends'},{'value':'Facebook'}]
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
    renderOptions(){
        return _.map(this.state.options, ({ value }) => {
            return <Option key={value} optionValue={value}/>
        })
    }
    render() {
        console.log("State", this.state);
        return (
            <div>
                <Question question={this.state.question}/>
                <Grid>
                    <Row>
                        <Col md={6}>
                            <div>
                                {this.renderOptions()}
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
}

export default QuestionContainer;
