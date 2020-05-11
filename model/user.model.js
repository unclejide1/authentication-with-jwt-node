
module.exports = (sequelize, Sequelize) =>{
const User = sequelize.define("user",{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});
    return User;
}