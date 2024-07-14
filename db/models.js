import mongoose from "mongoose";

const userSchema = mongoose.Schema({

})

const adminSchema = mongoose.Schema({

})

const courseSchema = mongoose.Schema({

})

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

export { User, Admin, Course }