import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config({ path: `${process.env.NODE_ENV}.env`});
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }

            // Save Google Auth data
            const user = await new User({
                googleId: profile.id,
                email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
                avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
            }).save();
            done(null, user);
        }
    )
);
