const {Model, DataTypes} = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            name: DataTypes.STRING,
            Password: DataTypes.STRING,
            Email: DataTypes.STRING,
        }, {sequelize})
    }
}

module.exports = User;