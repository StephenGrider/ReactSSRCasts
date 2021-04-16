import mongoose, { Schema } from 'mongoose';

export default () => {
    const AdminSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        secret: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('admins', AdminSchema);
}
