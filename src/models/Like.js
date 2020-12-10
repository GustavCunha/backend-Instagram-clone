const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    isLiked:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Like", LikeSchema);