import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        requierd: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;