const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = class PostController{

    async listPosts(req, res ){
        try{
            const postList = await Post.find({})
                .populate({
                    path: 'user',
                    select: 'name avatar'
                })
                .populate('comment');

            return res.status(200).json(postList);
        }catch (error) {
            res.status(400).json({error: `${error}`});
        }
    }

    async listCommentsPost(req, res){
        const {id} = req.params;
        
        try {
            const posts = await Post.findById({_id: id}).populate('comment');

            let commentsPost = posts.comments;

            let listComments = await Comment.findById({_id: commentsPost[0]});

            return res.status(200).json(commentsPost);
        } catch (error) {
            return res.status(400).json({error: `${error}`});
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

    async createdPost(req, res){
        const {
            user,
            image,
            likes,
            comments,
            description
        } = req.body;

        try {
            // if(likes.length > 0){
            //     likesCount += 1;
            // }

            const post = await Post.create(req.body);

            if(likes.length > 0){
                let posts = await Post.findByIdAndUpdate(post._id, {
                    $inc: {likesCount: 1}
                });

                return res.status(200).json({ success: true, data: posts });
            }else{
                return res.status(200).json({ success: true, data: post });
            }
            
        } catch (error) {
            return res.status(400).json(`Error: ${error}`);
        }
    }

    async deletePost(req, res){
        const post = await Post.findById(req.params.id);

        try {
            await post.remove();

            return res.status(200).json({message: "Deletado com sucesso!"});
        } catch (error) {
            return res.status(400).json(`Error: ${error}`);
        }
    }

    async getLikes(req, res){
        const {id} = req.params;

        try {
            const posts = await Post.findById({_id: id});

            let likesPost = posts.likes;

            return res.status(200).json(likesPost);
        } catch (error) {
            return res.status(400).json({error: `${error}`});
        }
    }
}