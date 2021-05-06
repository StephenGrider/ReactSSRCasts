import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions/fetchAdmins';
import { requireAuthHoc } from '@reactmono/components';

const AdminsListPage = ({ admins, fetchAdmins}) => {
    const renderAdmins = () => admins.map(admin => {
        return <li key={admin.id}>{admin.name}</li>;
    });

    useEffect(() => {
        if (!admins.length) {
            fetchAdmins();
        }
    }, []);

    return (
        <div>
            <h3>Protected list of admins</h3>
            <ul>{renderAdmins()}</ul>
        </div>
    );
};

function mapStateToProps({ admins }) {
    return { admins };
}

export default connect(
    mapStateToProps,
    { fetchAdmins }
)(requireAuthHoc(AdminsListPage));
