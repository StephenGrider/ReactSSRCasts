import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from '~client/module/header';
import { Alert } from '@reactmono/app-base-alert';
import getRoutes from '~client/bootstrap/routeProcessor';

const App = ({ route }) => {
    return (
        <div>
            <Alert />
            <Header />
            <Switch>
                {getRoutes().map((routeParams) => (
                    <Route key={routeParams.path} {...routeParams} />
                ))}
            </Switch>
        </div>
    );
};

export default App;
