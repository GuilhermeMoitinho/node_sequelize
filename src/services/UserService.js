const User = require('../models/User');

module.exports = {
    async index(req, res) {

        const users = await User.findAll();

        if (users == "" || users == null) {
            return res.status(200).send({ message: "Nenhum usuário cadastrado" });

        }

        return res.status(200).send({ users });

    },

    async store(req, res) {
        const { name, password, email } = req.body;

        const user = await User.create({ name, password, email });

        return res.status(201).send({
            sucesso: true,
            message: 'usuário cadastrado com sucesso!',
            userCreate: user 
        });
    },

    async update(req, res) {
    
    },

    async delete(req, res) {
    
    }
}