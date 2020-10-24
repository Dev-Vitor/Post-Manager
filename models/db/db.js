const Sequelize = require('sequelize')

//Conection whith Database

const sequelize = new Sequelize('blog', 'root', '2020201314', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}