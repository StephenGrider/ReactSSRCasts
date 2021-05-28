import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { action as userAction } from './store';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const { fetchUser, fetchNextUser } = userAction;

const User = ({user, nextUser, fetchUser, fetchNextUser}) => {
    let {id} = useParams();

    const head = () => {
        return (
            <Helmet>
                <title>{`${ user ? user.user : '' } User Loaded`}</title>
                <meta property={'og:title'} content={`User ${id} data`} />
            </Helmet>
        );
    };

    useEffect(() => {
        if (!user) {
            fetchUser(id);
        }

        if (!nextUser) {
            fetchNextUser(id);
        }
    }, []);

    return (
        <div>
            {head()}
            <h4>User Data:</h4>
            {user}
            <h4>Next User:</h4>
            {nextUser}
        </div>
    )
};

const mapStateToProps= (state) => ({
    user: state.user.user,
    nextUser: state.user.nextUser
});

export default connect(mapStateToProps, { fetchUser, fetchNextUser })(User);
