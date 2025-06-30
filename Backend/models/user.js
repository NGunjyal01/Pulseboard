
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required:true,},
    lastName:{
        type: String,
        require: true,},
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, 
        trim: true},
    password: { 
        type: String, 
        required: true },
    friends: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
    ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
