import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppConfig } from '@reactmono/registry';

const Header = ({ auth }) => {
    console.log('My auth status is', auth);
    const adminPath = AppConfig.get('adminPath');

    const authButton = auth
        ? <a href="#">Logout</a>
        : <a href="#">Login</a>;

    return (
        <nav>
            <div className={'nav-wrapper'}>
                <Link to={`/${adminPath}`} className={'brand-logo'}>Dashboard</Link>
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

export default connect(mapStateToProps)(Header);
