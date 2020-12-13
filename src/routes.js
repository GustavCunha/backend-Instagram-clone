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

// Rotas dos Posts
routes.get('/posts', postController.listPosts);
routes.post('/posts', postController.createdPost);
routes.delete('/posts/:id', postController.deletePost);
routes.get('/posts/like/:id', postController.getLikes);
routes.get('/posts/listComments/:id', postController.listCommentsPost);

// Rotas dos Comentários
routes.get('/posts/comments', commentController.list);
routes.get('/posts/comments/:id', commentController.getComment);
routes.post('/posts/comments/:id', commentController.addComment);
routes.delete('/posts/comments/:id', commentController.deleteComment);

// Rotas dos Likes
routes.get('/posts/likes', likeController.list);
routes.post('/posts/likes/:id', likeController.toogleLike);
routes.delete('/posts/likes/:id', likeController.deleteLike);

// Rotas da Autenticação
routes.get('/users', userController.list);
routes.get('/users/:user', userController.showUser);
routes.post('/user/signup', userController.signup);
routes.post('/user/login', userController.authenticate);
routes.get('/user/update/:user', userController.showUser);


module.exports = routes;