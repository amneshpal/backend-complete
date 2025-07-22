import { Router } from 'express';
import { registerUser } from '../controllers/user.contoller.js';  // Import registerUser function

const router = Router();

router.route('/register').post(registerUser);  // Use registerUser function, not the filename

export default router;
