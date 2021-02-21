import cookieSession from 'cookie-session';
import passport from 'passport';
import initPassport from './initPassport';

export default (app) => {
    initPassport();

    app.use(
        cookieSession({
            name: 'google-auth-session',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2]
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
}
