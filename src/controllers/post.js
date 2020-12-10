const Post = require("../models/Post");

module.exports = class PostController{

    async list(req, res ){
        try{
            const postList = await Post.find({}).populate(['comment']);

            return res.status(200).json(postList);
        }catch (error) {
            res.status(400).json({error: `${error}`});
        }
    }

    async toogleLike(req, res){

        const post = await Post.findById(req.params.id);

        if (post.likes.includes(req.user.id)) {
            const index = post.likes.indexOf(req.user.id);
            post.likes.splice(index, 1);
            post.likesCount = post.likesCount - 1;
            await post.save();
        } else {
            post.likes.push(req.user.id);
            post.likesCount = post.likesCount + 1;
            await post.save();
        }
        
        res.status(200).json({ success: true, data: {} });
    }
}