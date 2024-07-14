import { Router } from "express";
import userMiddleware from "../middleware/userMiddleware.js";
const router = Router();

router.post('/signup', (req, res) => {

})
router.get('/courses', (req, res) => {

});
router.post('/courses/:courseId', userMiddleware, (req, res) => {

})
router.get('/purchasedCourses', userMiddleware, (req, res) => {

})

export default router;