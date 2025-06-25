
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
    role: { 
        type: String, 
        enum: ['viewer', 'editor', 'admin'], 
        default: 'viewer',
        required: true, }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
