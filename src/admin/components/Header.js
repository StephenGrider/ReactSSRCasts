import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
    console.log('My auth status is', auth);

    const authButton = auth
        ? <a href="#">Logout</a>
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

export default connect(mapStateToProps)(Header);
