import { Router } from 'express';
import validations from './secret_validation';
import { validate } from '../../../middlewares/validation';
import { addSecret,getSecret } from './secret_controller';

const userRouter = Router();


userRouter.get('/secrets/:hash',getSecret);


userRouter.post('/secrets/',  addSecret);

export default userRouter;
