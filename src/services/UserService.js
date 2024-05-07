const User = require('../models/User');

module.exports = {
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

        return res.status(201).send({
            sucesso: true,
            message: 'usuário cadastrado com sucesso!',
            userCreate: user 
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