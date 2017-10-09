import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class RequireAuth extends Component {
    render() {
      return <ChildComponent />;
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
