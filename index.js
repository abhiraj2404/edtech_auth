import express from 'express'
import adminRouter from './routes/admin.js'
import userRouter from './routes/users.js'
import dbConnect from './db/dbConnect.js';
import { config } from 'dotenv';

config();

dbConnect()
    .then(() => {
        const app = express();

        app.use(express.json());

        app.use('/admin', adminRouter)
        app.use('/user', userRouter)

        app.listen(process.env.PORT, () => {
            console.log("Server is running on port 3000")
        })
    })
    .catch((error) => {
        console.log("error connecting to database", error)
        process.exit(1);
    })

