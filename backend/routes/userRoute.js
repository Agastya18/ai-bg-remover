import express from 'express';
import { clerkWebhook, userCredits,razorpayPayment } from '../controllers/userController.js';
import authUser from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/webhook', clerkWebhook);
userRouter.get('/credits',authUser,userCredits)
userRouter.post('/pay',authUser,razorpayPayment)

export default userRouter;