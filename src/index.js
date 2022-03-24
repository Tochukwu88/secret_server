import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import apiRoute from './routes';
import errorHandler from './utils/errorHandler';
import responseHandler from './utils/responseHandler';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return responseHandler(res, 200, 'Welcome to Secret Server API');
});

apiRoute(app);

app.use((req, res, next) => {
  const error = new Error('Please use /v1/<specific resource> to acess the API');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(`${err.status || 500} - ${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`);
  errorHandler(err, req, res, next);
});

export default app;
