// src/routes/user.routes.js

import { Router } from 'express';
import { registerUser } from '../controllers/user.contoller.js';  // Ensure correct relative path
import { upload } from '../middlewares/multer.middleware.js';  // Import upload middleware

const router = Router();

router.route('/register').post(
    upload,
    registerUser
);
export default router;
