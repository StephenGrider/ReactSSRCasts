import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
    console.log('My auth status is', auth);

    const  authButton = auth
        ? <a href="/api/logout">Logout</a>
        : <a href="/api/auth/google">Login</a>;

    const adminsLink =  auth
        ? <Link to={'/admins'}>Admins</Link>
        : '';

    return (
        <nav>
            <div className={'nav-wrapper'}>
                <Link to={'/'} className={'brand-logo'}>ReactMono</Link>
                <ul className={'right'}>
                    <li>
                        <Link to={'/users'}>Users</Link>
                    </li>
                    <li>{adminsLink}</li>
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
