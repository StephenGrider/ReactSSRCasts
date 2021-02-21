import mongoose from 'mongoose';
import config from 'config';

export default () => {
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
}
