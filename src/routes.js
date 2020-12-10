const express = require('express');
const routes = express.Router(); 
const PostController = require('./controllers/post');
const UserController = require('./controllers/user');
const CommentController = require('./controllers/comment');
const LikeController = require('./controllers/like');

const postController = new PostController();
const userController = new UserController();
const commentController = new CommentController();
const likeController = new LikeController();

routes.get('/posts', postController.listPosts);
routes.post('/posts', postController.createdPost);

routes.get('/posts/comments', commentController.list);
routes.post('/posts/comments', commentController.addComment);

routes.get('/posts/likes', likeController.list);

routes.get('/users', userController.list);
routes.post('/user/signup', userController.signup);
routes.post('/user/login', userController.authenticate);

module.exports = routes;