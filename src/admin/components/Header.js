import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Header = ({ auth, logout }) => {
    console.log('Header auth: ', auth);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const authButton = auth.admin
        ? <a href="#" onClick={handleLogout}>Logout</a>
        : <Link to={`/signup`}>Sign Up</Link>;

    return (
        <nav>
            <div className={'nav-wrapper'}>
                <Link to={`/`} className={'brand-logo'}>Dashboard</Link>
                <ul className={'right'}>
                    <li>{authButton}</li>
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { logout })(Header);
