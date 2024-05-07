const User = require('../models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/authConfig.json')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 78300,
    });
}

module.exports = {
     async login(req, res) {
        const { password, email, islogged } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({
                status: 0,
                message: 'Dados não encontrados',
                user: {}
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto!',
                user: {}
            });
        }

        const user_id = user.id;

        await User.update({
            islogged
        }, {
            where: {
                id: user_id
            }
        });

        user.password = undefined

        const token = generateToken({ id: user.id });

        return res.status(200).send({
            status: 1,
            message: "Usuário logado com sucesso!",
            user,
            token: token
        });
    },


    async index(req, res) {

        const users = await User.findAll();

        if (users == "" || users == null) {
            return res.status(404).send({ message: "Nenhum usuário cadastrado" });

        }

        return res.status(200).send({ users });

    },

    async userById(req, res) {
        const {id} = req.params;

        if(id == null || id == "")
            return res.status(404).send({ message: "Usuário não encontrado" });

        var user = await User.findByPk(id);

        return res.status(200).send(user);
    },

    async store(req, res) {
        const { name, password, email } = req.body;

        const user = await User.create({ name, password, email });

        const token = generateToken({ id: user.id });

        return res.status(201).send({
            sucesso: true,
            message: 'usuário cadastrado com sucesso!',
            userCreate: user,
            token: token
        });
    },

    async update(req, res) {
        const {id} = req.params;

        if(id == null || id == "")
            return res.status(404).send({ message: "Usuário não encontrado" });

        const { name, password, email } = req.body;

       const result =  await User.update({
            name, password, email
            }, {
                where: {
                    id: id
                }
            });
        

        return res.status(204).send({
            status: 1,
            message: "Usuário atualizado com sucesso!",
        });
    },

    async delete(req, res) {
        const {id} = req.params;

        if(id == null || id == "")
            return res.status(404).send({ message: "Usuário não encontrado" });

        await User.destroy(
            {
                where: {
                    id: id
                }
            })

            return res.status(204).send({
                status: 1,
                message: "Usuário deletado com sucesso!",
            });
    }
}