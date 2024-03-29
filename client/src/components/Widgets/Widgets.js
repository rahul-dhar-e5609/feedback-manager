import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Card, CardBlock, Progress} from "reactstrap";
import classNames from 'classnames';
import {mapToCssModules} from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  mainText: PropTypes.string,
  smallText: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  variant: PropTypes.string
};

const defaultProps = {
  header: '89.9%',
  mainText: 'Lorem ipsum...',
  smallText: 'Lorem ipsum dolor sit amet enim.',
  // color: '',
  value: "25",
  variant: ""
};

class Widget extends Component {
  render() {
    const {className, cssModule, header, mainText, smallText, color, value, children, variant, ...attributes} = this.props;

    // demo purposes only
    const progress = {style: "", color: color, value: value};
    const card = {style: "", bgColor: ""};

    if (variant === "inverse") {
      progress.style = "progress-white";
      progress.color = "";
      card.style = "text-white";
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames("progress-xs my-1", progress.style);

    return (
      <Card className={ classes } {...attributes}>
        <CardBlock className="card-body">
          <div className="h4 m-0">{ header }</div>
          <div>{ mainText }</div>
          <Progress className={ progress.style } color={ progress.color } value={ progress.value }/>
          <small className="text-muted">{ smallText }</small>
          <div>{children}</div>
        </CardBlock>
      </Card>
    )
  }
}

Widget.propTypes = propTypes;
Widget.defaultProps = defaultProps;

export default Widget;
