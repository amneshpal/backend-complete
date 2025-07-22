import { Router } from 'express';
import { registerUser } from '../controllers/user.contoller.js';  // Import registerUser function
import {upload} from '../middlewares/multer.middleware.js';  // Import upload if needed



const router = Router();

router.route('/register').post(
    upload.fields([
        {
        name : "avatar",
        maxCount: 1  // Limit to one file for avatar
        },
        {
        name : "cover",
        maxCount: 1  // Limit to one file for cover image

        }

    ]),  // Use upload if you need to handle file uploads
    registerUser);  // Use registerUser function, not the filename

export default router;
