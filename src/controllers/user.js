const User = require("../models/User");

module.exports = class UserController{

    async list(req, res ){
        try{
            const userList = await User.find({});

            return res.status(200).json(userList);
        }catch (error) {
            res.status(400).json({error: `${error}`});
        }
    }

    async signup(req, res){
        const {
            name,
            user,
            password,
            avatar
        } = req.body;

        let users = await User.findOne({name});

        if(!users){
            users = await User.create({
                name, user, password, avatar
            });
            // console.log(users);
        }

        return res.status(201).json(users);
    }

    async authenticate(req, res){
        const {user, password} = req.body;

        const usuario = await User.findOne({user}).select('+password');

        if(!usuario){
            return res.status(400).json("Usuário não encontrado");
        }

        usuario.password = undefined;

        res.status(200).json(usuario);
    }

    async update(req, res){
        const {user} = req.params;
        const {avatar} = req.body;

        try { 
            let users = await User.findOneAndUpdate({user}, {
                avatar: avatar
            });

            return res.status(200).json({users});
        } catch (error) {
            return res.status(400).json({error: `${error}`});
        }

    }

    async showUser(req, res){
        const {user} = req.params;
        try {
            const users = await User.findOne({user});

            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({error: `${error}`});
        }
    }
}