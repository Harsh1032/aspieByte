const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    phoneNumber:{
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
})

const Users = mongoose.model('User', userSchema);

module.exports = Users;