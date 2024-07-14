import mongoose from "mongoose";

const dbConnect = async function () {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("database connected successfully")
    } catch (error) {
        console.log("error connecting to database", error)
    }
}

export default dbConnect;