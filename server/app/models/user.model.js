const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    profilePicture:{
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);