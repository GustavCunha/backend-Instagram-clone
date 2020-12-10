const Comment = require("../models/Comment");

module.exports = class CommentController{
    async list(req, res){
        try{
            const commentList = await Comment.find({})
                .populate({
                    path: 'user',
                    select: 'user avatar'
                });

            return res.status(200).json(commentList);
        }catch (error) {
            res.status(400).json({error: `${error}`});
        }
    }

    async addComment(req, res){
        const {
            user,
            post,
            text
        } = req.body;

        try {
            const comment = await Comment.create({user, post, text});

            return res.status(200).json({ success: true, data: comment });
        } catch (error) {
            return res.status(400).json(`Error: ${error}`);
        }
    }
}