import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBaseApiPath } from '~app/util/client/config';

const Header = ({ auth }) => {
    console.log('My auth status is', auth);

    const authButton = auth
        ? <a onClick={e => (window.location.href = `${getBaseApiPath()}/logout`)}>Logout</a>
        : <a onClick={e => (window.location.href = `${getBaseApiPath()}/auth/google`)}>Login</a>;

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
