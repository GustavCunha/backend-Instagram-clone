const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = class CommentController{
    async list(req, res){
        try{
            const commentList = await Comment.find({})
                .populate({
                    path: 'user',
                    select: 'user avatar'
                })
                .populate({
                    path: 'post',
                    select: '_id'
                });

            return res.status(200).json(commentList);
        }catch (error) {
            res.status(400).json({error: `${error}`});
        }
    }

    async addComment(req, res){
        
        try {
            const post = await Post.findById(req.params.id);

            let comment = await Comment.create({
                user: req.body.user,
                post: req.params.id, 
                text: req.body.text
            });

            post.comments.push(comment._id);
            post.commentsCount = post.commentsCount + 1;
            await post.save();

            comment = await comment
                .populate({path: 'user', select: 'user avatar'})
                .execPopulate();

            return res.status(200).json({ success: true, data: comment });
        } catch (error) {
            return res.status(400).json(`Error: ${error}`);
        }
    }

    async deleteComment(req, res){
        try {
            const comment = await Comment.findByIdAndRemove(req.params.id);
            return res.status(200).json({message: "Deletado com sucesso!"});
        } catch (error) {
            return res.status(400).json(`Error: ${error}`);
        }
    }
}