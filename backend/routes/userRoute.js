import express from 'express';
import { 
    loginUser, 
    registerUser, 
    adminLogin, 
    sendRegisterOtp,
    sendPasswordOtp,
    verifyOtp, 
    resendOtp, 
    forgotPassword, 
    mobileotp,
    mobileOtpVerify
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', adminLogin);
userRouter.post('/registerotp', sendRegisterOtp);
userRouter.post('/passwordotp', sendPasswordOtp);
userRouter.post('/resendotp', resendOtp);
userRouter.post('/verifyotp', verifyOtp);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/mobileotp', mobileotp);
userRouter.post('/mobileotpverfiy', mobileOtpVerify);

export default userRouter;