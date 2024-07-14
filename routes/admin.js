import { Router } from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { Admin, Course } from "../db/models.js";
const router = Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const userExist = await Admin.findOne({
            username,
            password
        })
        if (userExist) {
            return res.status(403).json({
                msg: "admin already exists"
            })
        }
        else {
            const createdUser = await Admin.create({
                username,
                password
            })
            res.status(200).json({
                msg: "admin created successfully"
            })
        }
    } catch (error) {
        console.log("error in creating new admin", error);
    }
})


router.post('/courses', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    try {
        const foundCourse = await Course.findOne({
            title,
            description,
            imageLink,
            price
        })
        if (foundCourse) {
            return res.status(403).json({
                msg: "Course already exists"
            })
        }
        const createdCourse = await Course.create({
            title,
            description,
            imageLink,
            price
        })
        res.status(200).json({
            msg: "course created successfully",
            courseId: createdCourse._id
        })
    } catch (error) {
        console.log("error in creating course", error)
    }
})


router.get('/courses', adminMiddleware, async (req, res) => {
    try {
        const allCourses = await Course.find({})
        res.status(200).json({
            courses: allCourses
        })
    } catch (error) {
        console.log("error in getting all courses", error)
    }
});

export default router;