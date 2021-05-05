import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchInnerUsers } from '../actions/fetchUsers';

const InnerUsersList = ({ innerUsers, fetchInnerUsers }) => {
    const renderUsers = () => {
        return innerUsers && innerUsers.length > 0 && innerUsers.map(user => {
            return <li key={user.id}>{user.name}</li>;
        });
    }

    useEffect(() => {
        if (!innerUsers) {
            fetchInnerUsers();
        }
    }, []);

    return (
        <div>
            <h4>Inner Users List</h4>
            <ul>{renderUsers()}</ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { innerUsers: state.users.innerUsers };
}

export default connect(mapStateToProps, { fetchInnerUsers })(InnerUsersList);
