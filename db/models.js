import mongoose from "mongoose";


const adminSchema = mongoose.Schema({
    username: String,
    password: String
})

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    } ]
})
const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String

})

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

export { User, Admin, Course }