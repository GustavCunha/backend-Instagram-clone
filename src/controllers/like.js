const Like = require("../models/Like");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = class LikeController{
    async list(req, res){
        try{
            const likeList = await Like.find({})
                .populate({
                    path: 'user',
                    select: 'user'
                })
                .populate({
                    path: 'post',
                    select: '_id'
                });

            return res.status(200).json(likeList);
        }catch (error) {
            res.status(400).json({error: `${error}`});
        }
    }

    async getLike(req, res){

        const {id} = req.params;

        try {
            const likes = await Like.findById({_id: id});

            return res.status(200).json(likes);
        } catch (error) {
            return res.status(400).json({error: `${error}`});
        }
    }

    async toogleLike(req, res){
        
        const post = await Post.findById(req.params.id);
        const user = req.body.user;

        let like;
        try {

                if(post.likes.includes(req.body.user)){ //req.body.user
                    const index = post.likes.indexOf(req.body.user);
                    post.likes.splice(index, 1);
                    post.likesCount = post.likesCount - 1;
                    await post.save();

                    like = await Like.findOneAndDelete({user});

                }else{
                    post.likes.push(req.body.user);
                    post.likesCount = post.likesCount + 1;
                    await post.save();

                    like = await Like.create({
                        user: req.body.user,
                        post: req.params.id, 
                        isLiked: true
                    });

                }
            // }else{
            //     like = await Like.create({
            //         user: req.body.user,
            //         post: req.params.id, 
            //         isLiked: true
            //     });

            //     if(post.likes.includes(req.body.user)){
            //         const index = post.likes.indexOf(req.body.user);
            //         post.likes.splice(index, 1);
            //         post.likesCount = post.likesCount - 1;
            //         await post.save();
            //     }else{
            //         post.likes.push(req.body.user);
            //         post.likesCount = post.likesCount + 1;
            //         await post.save();
            //     }
            // }
            
            // like = await like
            //     .populate({path: 'user', select: 'user avatar'})
            //     .execPopulate();

            res.status(200).json({ success: true});
            
        } catch (error) {
            return res.status(400).json(`Error: ${error}`);
        }
    }

    async deleteLike(req, res){
        try {
            const like = await Like.findByIdAndRemove(req.params.id);
            return res.status(200).json({message: "Deletado com sucesso!"});
        } catch (error) {
            return res.status(400).json(`Error: ${error}`);
        }
    }
}