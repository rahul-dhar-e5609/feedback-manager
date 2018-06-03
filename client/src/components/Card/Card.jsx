import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

export class Card extends Component{
    render(){
        var inlineBlock = {
            display: 'inline-block'
        };
        return (
            <div className={"card"+(this.props.plain ? " card-plain":"")}>
                <div className={"header"
                    + (this.props.hCenter ? " text-center":"")}>
                    <Grid>
                       <Row>
                            <Col md={6}>
                                <h4 className="title">{this.props.title}</h4>
                                <p className="category">{this.props.category}</p>
                            </Col>
                            <Col md={6}>
                                {this.props.headerRight}
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <hr/>
                <div className={"content"
                    + (this.props.ctAllIcons ? " all-icons":"")
                    + (this.props.ctTableFullWidth ? " table-full-width":"")
                    + (this.props.ctTableResponsive ? " table-responsive":"")
                    + (this.props.ctTableUpgrade ? " table-upgrade":"")}>

                    {this.props.content || this.props.childern}

                    <div className="footer">
                        {this.props.legend}
                        {this.props.stats != null ? <hr />:""}
                        <div className="stats">
                            <i className={this.props.statsIcon}></i> {this.props.stats}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
