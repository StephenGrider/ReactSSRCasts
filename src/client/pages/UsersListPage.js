import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/fetchUsers';
import { Helmet } from 'react-helmet';
import InnerUsersList from '../components/InnerUsersList';

class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUsers() {
        return this.props.users && this.props.users.length > 0 && this.props.users.map(user => {
            return <li key={user.id}>{user.name}</li>;
        });
    }

    head() {
        return (
            <Helmet>
                <title>{`${this.props.users ? this.props.users.length : ''} Users Loaded`}</title>
                <meta property={'og:title'} content={'Users App'} />
            </Helmet>
        );
    }

    render() {
        return (
            <div>
                {this.head()}
                <h4>Here's a big list of users:</h4>
                <ul>{this.renderUsers()}</ul>
                <InnerUsersList />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { users: state.users.users };
}

export default connect(mapStateToProps, { fetchUsers })(UsersList);
