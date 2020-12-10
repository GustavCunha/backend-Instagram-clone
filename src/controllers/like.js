const Like = require("../models/Like");

module.exports = class LikeController{
    async list(req, res){
        try{
            const likeList = await Like.find({})
                .populate({
                    path: 'user',
                    select: 'user'
                })
                .populate('post');

            return res.status(200).json(likeList);
        }catch (error) {
            res.status(400).json({error: `${error}`});
        }
    }

    async toogleLike(req, res){
        
    }
}