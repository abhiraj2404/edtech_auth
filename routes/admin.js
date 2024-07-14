import { Router } from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = Router();

router.post('/signup', (req, res) => {

})
router.post('/courses', adminMiddleware, (req, res) => {

})
router.get('/courses', adminMiddleware, (req, res) => {

});

export default router;