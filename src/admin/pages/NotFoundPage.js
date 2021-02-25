import React from 'react';

const NotFoundPage = ({ staticContext = {} }) => {
    staticContext.notFound = true;

    return <h1>Ooops, route not found in Admin area.</h1>
};

export default NotFoundPage;
