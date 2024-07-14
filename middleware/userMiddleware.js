import { User } from "../db/models.js";


async function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    const foundUser = await User.findOne({
        username,
        password
    })
    if (foundUser) {
        next();
    }
    else {
        return res.status(403).json({
            msg: "user does not exist"
        })
    }
}

export default userMiddleware;