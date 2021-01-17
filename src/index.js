import 'babel-polyfill';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.env.NODE_ENV}.env`});
import express from 'express';
import config from 'config';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import DataResolver from './services/DataResolver';
import requireLogin from './middlewares/requireLogin';
import './services/passport';

/** Run DB connection. */
try {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.get('mongo.mongoURI'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    console.log('MongoDB Connected...');
} catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
}

const app = express();

app.use(express.static('public'));

/** Auth implementation, Cookie Key pass */
app.use(
    cookieSession({
        name: 'google-auth-session',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2]
    })
);
app.use(passport.initialize());
app.use(passport.session());

/** Routers configuration */
let dataResolver = {};
app.get('/api/users', (req, res) => {
    dataResolver = new DataResolver(req);
    res.send(dataResolver.get('users').data);
});

app.get('/api/inner-users', (req, res) => {
    dataResolver = new DataResolver(req);
    res.send(dataResolver.get('inner-users').data);
});

app.get('/api/admins', requireLogin, (req, res) => {
    dataResolver = new DataResolver(req);
    res.send(dataResolver.get('admins').data);
});

app.get('/api/current_user', (req, res) => {
    dataResolver = new DataResolver(req);
    res.send(dataResolver.get('current_user').data);
    // res.send(req.user);
});

app.get(
    '/api/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get(
    '/api/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/');
    }
);

app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

/**
 * Frontend routers configuration.
 * Process all other then api requests.
 * Backend frontend and browser frontend common start point.
 */
app.get('*', (req, res) => {
    const store = createStore(req);

    const promises = matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    }).map(promise => {
        if (promise) {
            return new Promise((resolve, reject) => {
                promise.then(resolve).catch(resolve);
            })
        }
    });

    /** Process page SSR data loaders */
    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.url) {
            return res.redirect(301, context.url);
        }

        if (context.notFound) {
            res.status(404);
        }

        res.send(content);
    });
});

/** Start application */
const serverPort = config.get('server.port');
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
