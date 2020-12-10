const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    user:{
        type: String,
        trim: true
    },
    password:{
        type: String,
    },
    avatar:{
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema);