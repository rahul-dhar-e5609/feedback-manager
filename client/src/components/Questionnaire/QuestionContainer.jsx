import React, { Component }
    from 'react';
//import Card from '../Card/Card.jsx';
import {
    Grid, Row, Col//, Table 
} from 'react-bootstrap';
import Question from './Question.jsx';
import Option from './Option.jsx';

export class QuestionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
    renderOptions(qindex, options) {
        console.log("options array", options);
        return options.map(( option, index ) => {

            return <Option qindex={qindex} index={index} option={option}/>
        });
    }
    renderQuestions() {
        return this.props.questions.map((question, index) => {
            return (<div key={index}>
                <Question index={index} question={question.text} />
                <Grid>
                    <Row>
                        <Col md={6}>
                            <div>
                                {this.renderOptions(index, question.options)}
                                <button className="btn btn-info" onClick={() => this.props.addOption(index)} type="button" >Add Option</button>
                            </div>
                        </Col>
                        {/* <Col md={4}>
                            <div style={{ display: 'inline-block, flex:1' }}>
                                <ChartistGraph data={dataPie} type="Pie" />
                                <div className="legend">
                                    {this.createLegend(legendPie)}
                                </div>
                            </div>
                        </Col> */}
                    </Row>
                </Grid>
            </div>);
        });
    }
    render() {
        return (
            <div>
                {this.renderQuestions()}
            </div>
        );
    }
}

export default QuestionContainer;
