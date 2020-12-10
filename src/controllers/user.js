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

        res.status(200).json({usuario, message: "Login com sucesso!"});
    }
}