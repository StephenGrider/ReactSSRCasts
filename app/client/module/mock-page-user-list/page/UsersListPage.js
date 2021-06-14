import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { action as usersAction } from '../store';
import { Helmet } from 'react-helmet';
import { InnerUsersList } from '~client/module/mock-inner-user-list';

const { fetchUsers } = usersAction;

const UsersList = ({ users, fetchUsers }) => {
    const head = () => (
        <Helmet>
            <title>{`${users ? users.length : ''} Users Loaded`}</title>
            <meta property={'og:title'} content={'Users App'} />
        </Helmet>
    );

    const renderUsers = () => users && users.length > 0 && users.map(user => {
        return <li key={user.id}>{user.name}</li>;
    });

    useEffect(() => {
        if (!users) {
            fetchUsers();
        }
    }, []);

    return (
        <div>
            {head()}
            <h4>Here's a big list of users:</h4>
            <ul>{renderUsers()}</ul>
            <InnerUsersList />
        </div>
    )
};

function mapStateToProps(state) {
    return { users: state.users.users };
}

export default connect(mapStateToProps, { fetchUsers })(UsersList);
