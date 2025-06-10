import express, { Router } from 'express'
import { googleLogin } from '../controllers/googleAuthController.js';
//

const googelRouter= express.Router()

googelRouter.post('/google-login',googleLogin);

export default googelRouter;