const express = require('express');
const routes = express.Router(); 
const PostController = require('./controllers/post');
const UserController = require('./controllers/user');

const postController = new PostController();
const userController = new UserController();

routes.get('/posts', postController.list);
routes.post('/posts', postController.createdPost);

routes.get('/users', userController.list);
routes.post('/user/signup', userController.signup);
routes.post('/user/login', userController.authenticate);

module.exports = routes;