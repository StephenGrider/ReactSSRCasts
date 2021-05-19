import React from 'react';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { Alert } from '@reactmono/app-base-alert';

const App = ({ route }) => {
    return (
        <div>
            <Alert />
            <Header />
            {renderRoutes(route.routes)}
        </div>
    );
}

export default App;
