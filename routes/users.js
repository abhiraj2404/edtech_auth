import { Router } from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import { User, Course } from "../db/models.js";
const router = Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const userExist = await User.findOne({
            username,
            password
        })
        if (userExist) {
            return res.status(403).json({
                msg: "user already exists"
            })
        }
        else {
            const createdUser = await User.create({
                username,
                password
            })
            res.status(200).json({
                msg: "user created successfully"
            })
        }
    } catch (error) {
        console.log("error in creating new user", error);
    }
})


router.get('/courses', async (req, res) => {
    try {
        const allCourses = await Course.find({})
        res.status(200).json({
            courses: allCourses
        })
    } catch (error) {
        console.log("error in getting all courses", error)
    }
});


router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username
    try {
        const foundCourse = await Course.findOne({
            _id: courseId
        })

        if (!foundCourse) {
            return res.status(403).json({
                msg: "course with given id does not exist"
            })
        }

        const purchasedCourse = await User.findOneAndUpdate({ username: username }, { $push: { purchasedCourses: foundCourse._id } })
        res.status(200).json({
            msg: "course purchased successfully"
        })
    } catch (error) {
        console.log("error in purchasing course", error)
    }
})
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const userData = await User.findOne({
            username: req.headers.username
        })

        let courses = await Course.find({
            _id: {
                '$in': userData.purchasedCourses
            }
        })

        res.status(200).json({
            purchasedCourses: courses
        })
    } catch (error) {
        console.log("error in getting purchased courses", error)
    }
})

export default router;