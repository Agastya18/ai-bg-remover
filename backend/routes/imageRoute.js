import express from 'express';
import uplaod from '../middlewares/multer.js';
import { removeImageBg } from '../controllers/imageController.js';
import authUser from '../middlewares/auth.js';

const imgaeRouer = express.Router()

imgaeRouer.post('/removebg',uplaod.single('image'),authUser,removeImageBg)

export default imgaeRouer;