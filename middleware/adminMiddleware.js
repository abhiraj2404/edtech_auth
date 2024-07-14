import { Admin } from "../db/models.js";

async function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    const foundAdmin = await Admin.findOne({
        username,
        password
    })
    if (foundAdmin) {
        next();
    }
    else {
        return res.status(403).json({
            msg: "admin does not exist"
        })
    }
}

export default adminMiddleware;