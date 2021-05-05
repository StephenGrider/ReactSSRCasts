import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentAdmin, submitSignIn } from '../actions/auth';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

/**
 * Admin Home Page.
 */
const AdminHome = ({ admin, fetchCurrentAdmin, submitSignIn }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        submitSignIn(data);
    };

    const getLoginForm = () => (
        <div className={'login-form center-align'} style={{marginTop: '200px'}}>
            <h3>Welcome</h3>
            <p>Admin Area</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="email"
                       ref={register({required: true})}
                       placeholder="Email" />
                <input name="password"
                       type="password"
                       ref={register({required: true})}
                       placeholder="Password" />
                <input type="submit" />
            </form>
        </div>
    );

    useEffect(() => {
        if (!admin) {
            fetchCurrentAdmin();
        }
    }, []);

    return (
        admin &&
        <>
            <h2>Dashboard</h2>
            <div>
                <span>Hello, {admin.name}</span>
            </div>
        </>
        || getLoginForm()
    );
};

AdminHome.propTypes = {
    admin: PropTypes.object,
    fetchCurrentAdmin: PropTypes.func.isRequired,
    submitSignIn: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    admin: state.auth && state.auth.admin ? state.auth.admin : null
});

const mapDispatchToProps = {
    submitSignIn,
    fetchCurrentAdmin
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
