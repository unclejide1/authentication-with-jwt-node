module.exports = (sequelize, Sequelize) =>{
    const Contact= sequelize.define("contact",{
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phoneNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW')
        }
    });
        return Contact;
    }