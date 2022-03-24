import { connect } from 'mongoose';
import { DB_URI } from './keys';

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  return connect(DB_URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

const dbConnect = async () => {
  try {
    await connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected successfully.');
  } catch (err) {
    console.log(`Mongoose connection was not succesful due to: ${err}`);
    setTimeout(connectWithRetry, 5000);
  }
};

export default dbConnect;
