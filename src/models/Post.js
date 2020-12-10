const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        }
    ],
    likesCount: {
        type: Number,
        default: 0,
    },
    comments: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment" 
        }
    ],
    commentsCount: {
        type: Number,
        default: 0,
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model("Post", PostSchema);