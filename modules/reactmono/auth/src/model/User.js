import mongoose, { Schema } from 'mongoose';

export default () => {
    const userSchema = new Schema({
        googleId: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        avatar: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('users', userSchema);
}
