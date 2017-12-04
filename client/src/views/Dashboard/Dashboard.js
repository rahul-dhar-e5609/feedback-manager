import React, { Component } from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {

  componentDidMount() {
    console.log("Dashboard props");
    console.dir(this.props);
  }
  render() {
    console.log("Rendering dashboard");
    return (
      <div className="animated fadeIn">
        Rendering Dashboard
      </div>
    )
  }
}

function mapStateToProps({auth}, ownProps) {
  return {
    auth
  }
}
export default connect(mapStateToProps) (Dashboard);
