import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from '~admin/module/header';
import { Alert } from '@reactmono/app-base-alert';
import getRoutes from '~admin/bootstrap/routeProcessor';

const App = () => {
    return (
        <div className={'app'}>
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
