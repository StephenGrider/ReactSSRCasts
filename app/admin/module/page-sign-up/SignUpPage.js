import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const SignUpPage = ({ auth }) => {
    return (
        auth.admin && <Redirect to={'/'} />
        || <div className={'center-align'} style={{marginTop: '200px'}}>
            <h3>Welcome</h3>
            <p>Sign Up Form</p>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, null)(SignUpPage);
