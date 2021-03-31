import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default (ChildComponent) => {
    const RequireAuth = (props) => (
        props.auth === false && <Redirect to={'/'} />
        || props.auth === null && <div>Loading...</div>
        || <ChildComponent {...props} />
    );

    function mapStateToProps({ auth }) {
        return { auth };
    }

    return connect(mapStateToProps)(RequireAuth);
};
